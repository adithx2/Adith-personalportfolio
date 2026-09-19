import mongoose from 'mongoose';

  export const connectDB = async () => {
  try {
    const mongoUri = (process.env.MONGODB_URI || '').trim();
    if (!mongoUri) {
      console.warn('[MongoDB Warning] MONGODB_URI not provided in environment variables');
      return;
    }
    const conn = await mongoose.connect(mongoUri);
    console.log(`[MongoDB] Connected to Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] ${error.message}`);
  }
};

