import multer from "multer";
import path from "path";
import fs from "fs";

// Helper to ensure folder exists
function ensureFolder(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

// Factory function for storage
function createStorage(folderName) {
  const folderPath = `uploads/${folderName}`;
  ensureFolder(folderPath);

  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderPath);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    }
  });
}

// Separate uploaders
export const movieUpload = multer({ storage: createStorage("movies") });
export const userUpload = multer({ storage: createStorage("users") });
