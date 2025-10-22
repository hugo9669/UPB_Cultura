import { Router } from "express";
import { requireAuth, requireCoordinator, requireLeader } from "../config/passport.js";
import { createEventCtrl, listEventsCtrl, getEventCtrl, updateEventCtrl, deleteEventCtrl } from "../controllers/events.js";

const r = Router();

// Rutas públicas
r.get("/", listEventsCtrl);           // listar eventos (público)
r.get("/:eventId", getEventCtrl);     // obtener evento específico (público)

// Rutas protegidas para líderes culturales, coordinadores y admins
r.post("/", requireAuth, requireLeader, createEventCtrl);       // crear evento (líderes, coordinadores, admins)
r.patch("/:eventId", requireAuth, requireLeader, updateEventCtrl); // actualizar evento con PATCH
r.put("/:eventId", requireAuth, requireLeader, updateEventCtrl); // actualizar evento con PUT (compatibilidad frontend)
r.delete("/:eventId", requireAuth, requireLeader, deleteEventCtrl); // eliminar evento (líderes, coordinadores, admins)

export default r;
