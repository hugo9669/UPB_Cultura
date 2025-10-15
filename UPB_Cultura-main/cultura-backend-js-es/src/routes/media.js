import express, { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { requireAuth, requireCoordinator } from "../config/passport.js";
import { uploadMediaCtrl } from "../controllers/media.js";
import { ensureUploadsDir, validateFileType, generateUniqueFilename } from "../services/media.js";

// Configuración de Multer con almacenamiento local en /uploads
const uploadsDir = ensureUploadsDir();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueFilename = generateUniqueFilename(file.originalname);
    cb(null, uniqueFilename);
  }
});

// Validación de archivos (solo imágenes, máximo 5MB)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (validateFileType(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, GIF, WebP)'), false);
    }
  }
});

const r = Router();

// Subida de media (restringido a coordinadores y admins)
r.post("/upload", requireAuth, requireCoordinator, upload.single("file"), uploadMediaCtrl);

// Servir archivos estáticos (para desarrollo)
r.use("/uploads", express.static(uploadsDir));

export default r;
