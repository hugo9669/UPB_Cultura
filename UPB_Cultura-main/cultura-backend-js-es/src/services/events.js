import { Event } from "../models/index.js";
import { Op } from "sequelize";
import { getRedis } from "../utils/redis.js";

export async function createEvent(payload) {
  const e = await Event.create(payload);
  await getRedis().flushall();
  return e;
}

export async function listEvents({ q, groupId, category, dateFrom, dateTo, upcoming, limit = 20, offset = 0 }) {
  const key = `events:list:${q||""}:${groupId||""}:${category||""}:${dateFrom||""}:${dateTo||""}:${upcoming||""}:${limit}:${offset}`;
  const redis = getRedis();
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const where = {};
  if (q) where.title = { [Op.iLike]: `%${q}%` };
  if (groupId) where.groupId = groupId;
  if (category) where.category = category;
  if (dateFrom || dateTo) where.startAt = { ...(where.startAt || {}) };
  if (dateFrom) where.startAt[Op.gte] = new Date(dateFrom);
  if (dateTo) where.startAt[Op.lte] = new Date(dateTo);
  if (upcoming) where.startAt = { ...(where.startAt||{}), [Op.gte]: new Date() };

  const items = await Event.findAll({ where, limit, offset, order: [["startAt", "ASC"]] });
  await redis.setex(key, 60, JSON.stringify(items));
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
  await getRedis().flushall();
  return e;
}

export async function deleteEvent(id) {
  const e = await Event.findByPk(id);
  if (!e) return false;
  await e.destroy();
  await getRedis().flushall();
  return true;
}
