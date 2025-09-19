import { Router } from "express";
import { summaryCtrl } from "../controllers/dashboard.js";
import { requireAuth } from "../config/passport.js";

const r = Router();

// KPIs básicos (idealmente restringir a admin)
r.get("/summary", requireAuth, summaryCtrl);

export default r;
