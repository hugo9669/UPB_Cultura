import { listEvents } from "../services/events.js";
import { buildICS } from "../utils/ics.js";

// Calendario global de eventos públicos
export async function globalCalendarCtrl(req, res, next) {
  try {
    const events = await listEvents({ upcoming: false, limit: 1000, offset: 0 });
    const ics = buildICS(events, { name: "Agenda Cultural" });
    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=agenda.ics");
    res.send(ics);
  } catch (err) { next(err); }
}

// Calendario por grupo
export async function groupCalendarCtrl(req, res, next) {
  try {
    const groupId = req.params.groupId;
    const events = await listEvents({ groupId, upcoming: false, limit: 1000, offset: 0 });
    const ics = buildICS(events, { name: `Agenda Grupo ${groupId}` });
    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename=grupo-${groupId}.ics`);
    res.send(ics);
  } catch (err) { next(err); }
}
