import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import { connectDB } from './config/db.js';

dotenv.config();

const defaultAdmin = {
  name: 'Adith S',
  email: 'adiths746@gmail.com',
  password: 'admin123',
  role: 'admin',
};

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existing = await Admin.findOne({ email: defaultAdmin.email });

    if (existing) {
      existing.name = defaultAdmin.name;
      existing.password = defaultAdmin.password; // pre('save') hook will bcrypt hash it
      existing.role = 'admin';
      await existing.save();
      console.log(`[Admin Seed] Existing admin updated: ${defaultAdmin.email} (Password: ${defaultAdmin.password})`);
    } else {
      await Admin.create(defaultAdmin);
      console.log(`[Admin Seed] New admin created: ${defaultAdmin.email} (Password: ${defaultAdmin.password})`);
    }

    process.exit(0);
  } catch (error) {
    console.error('[Admin Seed Error]', error);
    process.exit(1);
  }
};

seedAdmin();
