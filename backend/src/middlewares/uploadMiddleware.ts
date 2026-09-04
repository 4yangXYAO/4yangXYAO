import multer from "multer";
import os from "os";
import path from "path";
import fs from "fs";

// Vercel's filesystem is read-only outside /tmp. When the project dir can't be
// written, fall back to tmp (files are then ephemeral per instance; real
// persistence needs Vercel Blob / Cloudinary - pending decision).
const localDir = path.resolve(process.cwd(), "uploads");
let uploadDir = localDir;
try {
  fs.mkdirSync(localDir, { recursive: true });
} catch {
  uploadDir = path.join(os.tmpdir(), "uploads");
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDir);
  },
  filename: (_req, file, callback) => {
    const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    callback(null, fileName);
  },
});

export const upload = multer({ storage });
