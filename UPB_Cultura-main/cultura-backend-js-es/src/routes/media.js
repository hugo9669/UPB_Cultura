import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { requireAuth } from "../config/passport.js";
import { uploadMediaCtrl } from "../controllers/media.js";

// Configuración de Multer con almacenamiento local en /uploads
const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random()*1e9);
    const ext = path.extname(file.originalname || "");
    cb(null, unique + ext);
  }
});

// Validación básica de tipo y tamaño (ejemplo: 5MB)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    // TODO: ampliar validaciones (solo imágenes, etc.)
    cb(null, true);
  }
});

const r = Router();

// Subida de media (restringido a usuarios autenticados)
r.post("/upload", requireAuth, upload.single("file"), uploadMediaCtrl);

// Nota: Servir /uploads por Nginx u otra capa. En dev, puedes usar express.static si deseas.
// app.use("/uploads", express.static(path.resolve("uploads"))) en app.js (si lo habilitas).

export default r;
