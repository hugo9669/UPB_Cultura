import { Router } from "express";
import { requireAuth } from "../config/passport.js";
import { createAnnouncementCtrl, listAnnouncementsCtrl, updateAnnouncementCtrl, deleteAnnouncementCtrl } from "../controllers/announcements.js";

const r = Router();

// Anuncios internos por grupo
r.get("/", listAnnouncementsCtrl);                            // público/miembros según política (implementar si se requiere)
r.post("/", requireAuth, createAnnouncementCtrl);             // crear (coordinador/leader)
r.patch("/:announcementId", requireAuth, updateAnnouncementCtrl);
r.delete("/:announcementId", requireAuth, deleteAnnouncementCtrl);

export default r;
