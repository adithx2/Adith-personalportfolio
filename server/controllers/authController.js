import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export const inMemoryAdmins = [];

const getJwtSecret = () => {
  return process.env.JWT_SECRET 
};

const generateToken = (id) => {
  return jwt.sign({ id }, getJwtSecret(), {
    expiresIn: '7d',
  });
};
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminSecretKey } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, email, and password.',
      });
    }

    const configuredSecret = process.env.ADMIN_SECRET_KEY
    if (!adminSecretKey || adminSecretKey.trim() !== configuredSecret) {
      return res.status(403).json({
        success: false,
        error: 'Registration Forbidden: Invalid or missing Admin Security Passkey. Normal visitors cannot create admin accounts.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      let admin = await Admin.findOne({ email: normalizedEmail });
      if (admin) {
        // Valid secret key provided - update name & password
        admin.name = name.trim();
        admin.password = password;
        await admin.save();

        const token = generateToken(admin._id);
        return res.status(200).json({
          success: true,
          message: 'Admin account password updated successfully!',
          token,
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
          },
        });
      }

      admin = await Admin.create({
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: 'admin',
      });

      const token = generateToken(admin._id);

      return res.status(201).json({
        success: true,
        message: 'Admin account created successfully!',
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
    } else {
      // In-Memory Fallback
      const existingIndex = inMemoryAdmins.findIndex((a) => a.email === normalizedEmail);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      if (existingIndex !== -1) {
        inMemoryAdmins[existingIndex].name = name.trim();
        inMemoryAdmins[existingIndex].password = hashedPassword;
        const token = generateToken(inMemoryAdmins[existingIndex].id);
        return res.status(200).json({
          success: true,
          message: 'Admin account password updated in memory successfully!',
          token,
          admin: {
            id: inMemoryAdmins[existingIndex].id,
            name: inMemoryAdmins[existingIndex].name,
            email: inMemoryAdmins[existingIndex].email,
            role: inMemoryAdmins[existingIndex].role,
          },
        });
      }

      const memId = `admin_${Date.now()}`;
      const newMemAdmin = {
        id: memId,
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date().toISOString(),
      };

      inMemoryAdmins.push(newMemAdmin);

      const token = generateToken(memId);

      return res.status(201).json({
        success: true,
        message: 'Admin account created in memory successfully!',
        token,
        admin: {
          id: memId,
          name: newMemAdmin.name,
          email: newMemAdmin.email,
          role: newMemAdmin.role,
        },
      });
    }
  } catch (error) {
    console.error('[Auth Register Error]', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error during admin registration.',
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both email and password.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      const admin = await Admin.findOne({ email: normalizedEmail }).select('+password');

      if (!admin) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password.',
        });
      }

      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password.',
        });
      }

      const token = generateToken(admin._id);

      return res.status(200).json({
        success: true,
        message: 'Logged in successfully!',
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
    } else {
      // In-Memory Fallback
      const memAdmin = inMemoryAdmins.find((a) => a.email === normalizedEmail);

      if (!memAdmin) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password.',
        });
      }

      const isMatch = await bcrypt.compare(password, memAdmin.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password.',
        });
      }

      const token = generateToken(memAdmin.id);

      return res.status(200).json({
        success: true,
        message: 'Logged in successfully (in-memory mode)!',
        token,
        admin: {
          id: memAdmin.id,
          name: memAdmin.name,
          email: memAdmin.email,
          role: memAdmin.role,
        },
      });
    }
  } catch (error) {
    console.error('[Auth Login Error]', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error during login.',
    });
  }
};


export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error retrieving admin profile.',
    });
  }
};
