// Servicio de media: en este scaffold almacenamos localmente en /uploads
// TODO: Cambiar a S3/GCS o servidor de archivos institucional en producción.
import path from "path";

export function buildPublicUrl(filename) {

  return `/uploads/${filename}`;
}

// Validaciones de archivo se hacen en el middleware Multer del router.
