import { Router } from "express";
import { requireAuth } from "../config/passport.js";
import { createEventCtrl, listEventsCtrl, getEventCtrl, updateEventCtrl, deleteEventCtrl } from "../controllers/events.js";

const r = Router();

// CRUD de eventos
r.post("/", requireAuth, createEventCtrl);
r.get("/", listEventsCtrl);                     // público con filtros
r.get("/:eventId", getEventCtrl);               // público: detalle
r.patch("/:eventId", requireAuth, updateEventCtrl);
r.delete("/:eventId", requireAuth, deleteEventCtrl);

export default r;
