import createError from "http-errors";
import * as svc from "../services/events.js";
import { createEventSchema, updateEventSchema } from "../validation/events.js";

export async function createEventCtrl(req, res, next) {
  try {
    const { value, error } = createEventSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const e = await svc.createEvent(value);
    res.status(201).json(e);
  } catch (err) { next(err); }
}

export async function listEventsCtrl(req, res, next) {
  try {
    const { q, groupId, category, date_from, date_to, upcoming, limit, offset } = req.query;
    
    // Determinar si se deben filtrar eventos pasados
    // Solo los administradores pueden ver eventos históricos
    const userRole = req.user?.rol?.nombreRol;
    const isAdmin = userRole === 'administrador';
    
    // Si no es administrador, forzar filtro de eventos futuros
    const shouldFilterUpcoming = !isAdmin ? true : (upcoming === "true");
    
    console.log('🔍 Listando eventos:', {
      userRole,
      isAdmin,
      filterUpcoming: shouldFilterUpcoming
    });
    
    const items = await svc.listEvents({
      q, groupId, category,
      dateFrom: date_from,
      dateTo: date_to,
      upcoming: shouldFilterUpcoming,
      limit: Number(limit)||20,
      offset: Number(offset)||0
    });
    res.json(items);
  } catch (err) { next(err); }
}

export async function getEventCtrl(req, res, next) {
  try {
    const e = await svc.getEvent(req.params.eventId);
    if (!e) throw createError(404, "Evento no encontrado");
    res.json(e);
  } catch (err) { next(err); }
}

export async function updateEventCtrl(req, res, next) {
  try {
    const { value, error } = updateEventSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const e = await svc.updateEvent(req.params.eventId, value);
    if (!e) throw createError(404, "Evento no encontrado");
    res.json(e);
  } catch (err) { next(err); }
}

export async function deleteEventCtrl(req, res, next) {
  try {
    const ok = await svc.deleteEvent(req.params.eventId);
    if (!ok) throw createError(404, "Evento no encontrado");
    res.status(204).send();
  } catch (err) { next(err); }
}
