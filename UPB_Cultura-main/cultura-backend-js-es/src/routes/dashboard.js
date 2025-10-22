import { Router } from "express";
import { requireAuth, requireAdmin } from "../config/passport.js";
import { getStatsCtrl } from "../controllers/dashboard.js";

const r = Router();

// Ruta para obtener estadísticas del dashboard (solo administradores)
r.get("/stats", requireAuth, requireAdmin, getStatsCtrl);

export default r;
