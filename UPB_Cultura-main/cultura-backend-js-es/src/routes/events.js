import { Router } from "express";
<<<<<<< HEAD
import { requireAuth, requireCoordinator, requireLeader } from "../config/passport.js";
=======
import { requireAuth, requireCoordinator } from "../config/passport.js";
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
import { createEventCtrl, listEventsCtrl, getEventCtrl, updateEventCtrl, deleteEventCtrl } from "../controllers/events.js";

const r = Router();

// Rutas públicas
r.get("/", listEventsCtrl);           // listar eventos (público)
r.get("/:eventId", getEventCtrl);     // obtener evento específico (público)

<<<<<<< HEAD
// Rutas protegidas para líderes culturales, coordinadores y admins
r.post("/", requireAuth, requireLeader, createEventCtrl);       // crear evento (líderes, coordinadores, admins)
r.patch("/:eventId", requireAuth, requireLeader, updateEventCtrl); // actualizar evento con PATCH
r.put("/:eventId", requireAuth, requireLeader, updateEventCtrl); // actualizar evento con PUT (compatibilidad frontend)
r.delete("/:eventId", requireAuth, requireLeader, deleteEventCtrl); // eliminar evento (líderes, coordinadores, admins)
=======
// Rutas protegidas (solo coordinadores y admins)
r.post("/", requireAuth, requireCoordinator, createEventCtrl);       // crear evento
r.patch("/:eventId", requireAuth, requireCoordinator, updateEventCtrl); // actualizar evento
r.delete("/:eventId", requireAuth, requireCoordinator, deleteEventCtrl); // eliminar evento
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628

export default r;
