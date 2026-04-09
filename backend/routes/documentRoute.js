import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Document from "../models/Document.js";
import auth from "../middleware/auth.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Upload document
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const { title, tags, category } = req.body;
    const doc = await Document.create({
      title,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
      category: category || "General",
      filename: req.file.filename,
      filepath: req.file.path,
      mimetype: req.file.mimetype,
      uploadedBy: req.user.id,
      versions: [{
        filename: req.file.filename,
        filepath: req.file.path,
        uploadedBy: req.user.id,
        note: "Initial upload",
      }],
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all documents (with search/filter)
router.get("/", auth, async (req, res) => {
  try {
    const { search, tag, category } = req.query;
    const query = {};

    if (search) query.title = { $regex: search, $options: "i" };
    if (tag) query.tags = tag;
    if (category) query.category = category;

    const docs = await Document.find(query).populate("uploadedBy", "name email").sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single document
router.get("/:id", auth, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id).populate("uploadedBy", "name email");
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update document (new version)
router.put("/:id", auth, upload.single("file"), async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    const { title, tags, category, versionNote } = req.body;
    if (title) doc.title = title;
    if (tags) doc.tags = tags.split(",").map(t => t.trim());
    if (category) doc.category = category;

    if (req.file) {
      doc.filename = req.file.filename;
      doc.filepath = req.file.path;
      doc.versions.push({
        filename: req.file.filename,
        filepath: req.file.path,
        uploadedBy: req.user.id,
        note: versionNote || "Updated",
      });
    }

    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete document
router.delete("/:id", auth, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    if (doc.uploadedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    await doc.deleteOne();
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;