import { Router } from "express";
import { requireAuth, requireCoordinator } from "../config/passport.js";
import { createEventCtrl, listEventsCtrl, getEventCtrl, updateEventCtrl, deleteEventCtrl } from "../controllers/events.js";

const r = Router();

// Rutas públicas
r.get("/", listEventsCtrl);           // listar eventos (público)
r.get("/:eventId", getEventCtrl);     // obtener evento específico (público)

// Rutas protegidas (solo coordinadores y admins)
r.post("/", requireAuth, requireCoordinator, createEventCtrl);       // crear evento
r.patch("/:eventId", requireAuth, requireCoordinator, updateEventCtrl); // actualizar evento
r.delete("/:eventId", requireAuth, requireCoordinator, deleteEventCtrl); // eliminar evento

export default r;
