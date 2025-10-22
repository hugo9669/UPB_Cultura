import { Router } from "express";
import { requireAuth, requireAdmin } from "../config/passport.js";
import {
  getEventsReportCtrl,
  getGroupsReportCtrl,
  getUsersReportCtrl,
  getMessagesReportCtrl,
  getGeneralReportCtrl
} from "../controllers/reports.js";

const r = Router();

// Todas las rutas de reportes requieren autenticación y rol de administrador
r.get("/events", requireAuth, requireAdmin, getEventsReportCtrl);
r.get("/groups", requireAuth, requireAdmin, getGroupsReportCtrl);
r.get("/users", requireAuth, requireAdmin, getUsersReportCtrl);
r.get("/messages", requireAuth, requireAdmin, getMessagesReportCtrl);
r.get("/general", requireAuth, requireAdmin, getGeneralReportCtrl);

export default r;


