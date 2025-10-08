import createError from "http-errors";
import * as svc from "../services/announcements.js";
import { createAnnouncementSchema, updateAnnouncementSchema } from "../validation/announcements.js";

export async function createAnnouncementCtrl(req, res, next) {
  try {
    const authorId = req.user?.id; // requiere JWT
    const { value, error } = createAnnouncementSchema.validate({ ...req.body });
    if (error) throw createError(400, error.message);
    const a = await svc.createAnnouncement({ ...value, authorId });
    res.status(201).json(a);
  } catch (err) { next(err); }
}

export async function listAnnouncementsCtrl(req, res, next) {
  try {
    const { groupId, limit, offset } = req.query;
    const items = await svc.listAnnouncements({ groupId, limit: Number(limit)||20, offset: Number(offset)||0 });
    res.json(items);
  } catch (err) { next(err); }
}

export async function updateAnnouncementCtrl(req, res, next) {
  try {
    const { value, error } = updateAnnouncementSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const a = await svc.updateAnnouncement(req.params.announcementId, value);
    if (!a) throw createError(404, "Anuncio no encontrado");
    res.json(a);
  } catch (err) { next(err); }
}

export async function deleteAnnouncementCtrl(req, res, next) {
  try {
    const ok = await svc.deleteAnnouncement(req.params.announcementId);
    if (!ok) throw createError(404, "Anuncio no encontrado");
    res.status(204).send();
  } catch (err) { next(err); }
}
