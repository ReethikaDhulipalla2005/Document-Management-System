import mongoose from "mongoose";

const versionSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now },
  note: String,
});

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [{ type: String }],
  category: { type: String, default: "General" },
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  mimetype: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  permissions: {
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    editors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isPublic: { type: Boolean, default: true },
  },
  versions: [versionSchema],
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);