import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    description: { type: String, required: true },
    longDescription: { type: String },
    tags: [{ type: String }],
    demoUrl: { type: String },
    githubUrl: { type: String },
    features: [{ type: String }],
    bgGradient: { type: String, default: 'from-cyan-600/30 to-violet-600/30' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Project', projectSchema);
