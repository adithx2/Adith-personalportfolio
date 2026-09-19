import Message from '../models/Message.js';
import mongoose from 'mongoose';

// In-memory message store for when local MongoDB is not running
let inMemoryMessages = [];

export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields (name, email, message).',
      });
    }

    // Check if MongoDB is connected
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      const newMessage = await Message.create({
        name,
        email,
        message,
        status: 'unread',
        ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
      });

      return res.status(201).json({
        success: true,
        message: 'Message received and saved to MongoDB successfully!',
        data: {
          id: newMessage._id,
          createdAt: newMessage.createdAt,
          storage: 'MongoDB Database',
        },
      });
    } else {
      // Offline / In-Memory Fallback
      const fallbackMessage = {
        _id: `mem_${Date.now()}`,
        id: `mem_${Date.now()}`,
        name,
        email,
        message,
        status: 'unread',
        createdAt: new Date().toISOString(),
        ipAddress: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
        storage: 'In-Memory Store',
      };

      inMemoryMessages.unshift(fallbackMessage);

      console.log('[Express Server - In-Memory Contact Received]', fallbackMessage);

      return res.status(201).json({
        success: true,
        message: 'Message received successfully!',
        data: fallbackMessage,
      });
    }
  } catch (error) {
    console.error('[Contact Error]', error);
    return res.status(500).json({
      success: false,
      error: 'Server error processing your message. Please try again later.',
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1;
    const { status, search } = req.query;

    if (isMongoConnected) {
      const query = {};
      if (status && status !== 'all') {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { message: { $regex: search, $options: 'i' } },
        ];
      }

      const dbMessages = await Message.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        storage: 'MongoDB',
        count: dbMessages.length,
        data: dbMessages,
      });
    } else {
      let filtered = [...inMemoryMessages];
      if (status && status !== 'all') {
        filtered = filtered.filter((m) => m.status === status);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.name.toLowerCase().includes(s) ||
            m.email.toLowerCase().includes(s) ||
            m.message.toLowerCase().includes(s)
        );
      }

      return res.status(200).json({
        success: true,
        storage: 'In-Memory Store',
        count: filtered.length,
        data: filtered,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be unread, read, or archived.',
      });
    }

    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      const updated = await Message.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({
          success: false,
          error: 'Message not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: `Message status updated to ${status}`,
        data: updated,
      });
    } else {
      const msgIndex = inMemoryMessages.findIndex(
        (m) => m.id === id || m._id === id
      );

      if (msgIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Message not found in memory store',
        });
      }

      inMemoryMessages[msgIndex].status = status;

      return res.status(200).json({
        success: true,
        message: `Message status updated to ${status}`,
        data: inMemoryMessages[msgIndex],
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      const deleted = await Message.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Message not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Enquiry deleted successfully',
      });
    } else {
      const initialLength = inMemoryMessages.length;
      inMemoryMessages = inMemoryMessages.filter(
        (m) => m.id !== id && m._id !== id
      );

      if (inMemoryMessages.length === initialLength) {
        return res.status(404).json({
          success: false,
          error: 'Message not found in memory store',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Enquiry deleted successfully from memory store',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getEnquiryStats = async (req, res) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      const total = await Message.countDocuments();
      const unread = await Message.countDocuments({ status: 'unread' });
      const read = await Message.countDocuments({ status: 'read' });
      const archived = await Message.countDocuments({ status: 'archived' });

      return res.status(200).json({
        success: true,
        data: { total, unread, read, archived },
      });
    } else {
      const total = inMemoryMessages.length;
      const unread = inMemoryMessages.filter((m) => m.status === 'unread').length;
      const read = inMemoryMessages.filter((m) => m.status === 'read').length;
      const archived = inMemoryMessages.filter((m) => m.status === 'archived').length;

      return res.status(200).json({
        success: true,
        data: { total, unread, read, archived },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
