// Servicio de media: en este scaffold almacenamos localmente en /uploads
// TODO: Cambiar a S3/GCS o servidor de archivos institucional en producción.
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function buildPublicUrl(filename) {
  return `/uploads/${filename}`;
}

// Crear directorio de uploads si no existe
export function ensureUploadsDir() {
  const uploadsDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  return uploadsDir;
}

// Validar tipo de archivo
export function validateFileType(mimetype) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return allowedTypes.includes(mimetype);
}

// Generar nombre único para archivo
export function generateUniqueFilename(originalname) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const ext = path.extname(originalname);
  return `${timestamp}_${random}${ext}`;
}

// Eliminar archivo
export function deleteFile(filename) {
  try {
    const filePath = path.join(ensureUploadsDir(), filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error eliminando archivo:', error);
    return false;
  }
}
