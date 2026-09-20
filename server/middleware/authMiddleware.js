import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import mongoose from 'mongoose';
import { inMemoryAdmins } from '../controllers/authController.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const isMongoConnected = mongoose.connection.readyState === 1;

      if (isMongoConnected) {
        req.admin = await Admin.findById(decoded.id).select('-password');

        if (!req.admin) {
          return res.status(401).json({
            success: false,
            error: 'Not authorized, admin account not found.',
          });
        }
      } else {
        // Fallback for in-memory store
        const memAdmin = inMemoryAdmins.find((a) => a.id === decoded.id);
        if (!memAdmin) {
          return res.status(401).json({
            success: false,
            error: 'Not authorized, admin session not found.',
          });
        }
        req.admin = {
          id: memAdmin.id,
          name: memAdmin.name,
          email: memAdmin.email,
          role: memAdmin.role,
        };
      }

      if (req.admin.role !== 'admin' && req.admin.role !== 'superadmin') {
        return res.status(403).json({
          success: false,
          error: 'Forbidden: Access restricted to administrators only.',
        });
      }

      return next();
    } catch (error) {
      console.error('[Auth Middleware Error]', error.message);
      return res.status(401).json({
        success: false,
        error: 'Not authorized, token invalid or expired.',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no authorization token provided.',
    });
  }
};
