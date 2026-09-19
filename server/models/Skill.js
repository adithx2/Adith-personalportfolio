import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    iconClass: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
    desc: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Skill', skillSchema);
