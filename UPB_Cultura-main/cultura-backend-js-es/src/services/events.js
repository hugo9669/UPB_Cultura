import { Event } from "../models/index.js";
import { Op } from "sequelize";
import { getRedis, isRedisAvailable } from "../utils/redis.js";

export async function createEvent(payload) {
  const e = await Event.create(payload);
  if (isRedisAvailable()) {
    try {
      await getRedis().flushall();
    } catch (error) {
      console.log('[Redis] Error al limpiar cache:', error.message);
    }
  }
  return e;
}

export async function listEvents({ q, groupId, category, dateFrom, dateTo, upcoming, limit = 20, offset = 0 }) {
  // Intentar usar cache de Redis si está disponible
  if (isRedisAvailable()) {
    try {
      const key = `events:list:${q||""}:${groupId||""}:${category||""}:${dateFrom||""}:${dateTo||""}:${upcoming||""}:${limit}:${offset}`;
      const redis = getRedis();
      const cached = await redis.get(key);
      if (cached) return JSON.parse(cached);
    } catch (error) {
      console.log('[Redis] Error al obtener cache:', error.message);
    }
  }

  const where = {};
  if (q) where.titulo = { [Op.iLike]: `%${q}%` };
  if (groupId) where.idGrupo = groupId;
  if (category) where.category = category;
  if (dateFrom || dateTo) where.fechaEvento = { ...(where.fechaEvento || {}) };
  if (dateFrom) where.fechaEvento[Op.gte] = new Date(dateFrom);
  if (dateTo) where.fechaEvento[Op.lte] = new Date(dateTo);
  if (upcoming) where.fechaEvento = { ...(where.fechaEvento||{}), [Op.gte]: new Date() };

  const items = await Event.findAll({ where, limit, offset, order: [["fechaEvento", "ASC"]] });
  
  // Intentar guardar en cache si Redis está disponible
  if (isRedisAvailable()) {
    try {
      const key = `events:list:${q||""}:${groupId||""}:${category||""}:${dateFrom||""}:${dateTo||""}:${upcoming||""}:${limit}:${offset}`;
      await getRedis().setex(key, 60, JSON.stringify(items));
    } catch (error) {
      console.log('[Redis] Error al guardar cache:', error.message);
    }
  }
  
  return items;
}

export async function getEvent(id) {
  return Event.findByPk(id);
}

export async function updateEvent(id, data) {
  const e = await Event.findByPk(id);
  if (!e) return null;
  if (data.endAt && data.startAt && new Date(data.endAt) < new Date(data.startAt)) {
    throw new Error("endAt no puede ser anterior a startAt");
  }
  await e.update(data);
  if (isRedisAvailable()) {
    try {
      await getRedis().flushall();
    } catch (error) {
      console.log('[Redis] Error al limpiar cache:', error.message);
    }
  }
  return e;
}

export async function deleteEvent(id) {
  const e = await Event.findByPk(id);
  if (!e) return false;
  await e.destroy();
  if (isRedisAvailable()) {
    try {
      await getRedis().flushall();
    } catch (error) {
      console.log('[Redis] Error al limpiar cache:', error.message);
    }
  }
  return true;
}
