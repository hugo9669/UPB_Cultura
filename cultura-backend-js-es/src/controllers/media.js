import createError from "http-errors";
import path from "path";
import fs from "fs";
import { buildPublicUrl } from "../services/media.js";

// Multer configura el archivo en req.file; este controlador retorna metadatos mínimos.
export async function uploadMediaCtrl(req, res, next) {
  try {
    if (!req.file) throw createError(400, "Archivo requerido");
    const { groupId, eventId, caption } = req.body;
    // TODO: persistir registro en tabla media si se desea (requiere modelo Media y servicio)
    const url = buildPublicUrl(req.file.filename);
    res.status(201).json({ kind: req.file.mimetype, url, groupId, eventId, caption });
  } catch (err) { next(err); }
}
