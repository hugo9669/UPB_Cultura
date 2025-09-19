import { Router } from "express";
import { globalCalendarCtrl, groupCalendarCtrl } from "../controllers/calendars.js";

const r = Router();

// Exporta calendarios .ics
r.get("/events.ics", globalCalendarCtrl);
r.get("/group/:groupId.ics", groupCalendarCtrl);

export default r;
