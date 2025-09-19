import { Group } from "../models/index.js";
import { Op } from "sequelize";
import { getRedis } from "../utils/redis.js";

export async function createGroup(payload) {
  const group = await Group.create(payload);
  await getRedis().flushall(); // invalida caches simples
  return group;
}

export async function listGroups({ q, category, limit = 20, offset = 0 }) {
  const key = `groups:list:${q || ""}:${category || ""}:${limit}:${offset}`;
  const redis = getRedis();
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const where = {};
  if (q) where.name = { [Op.iLike]: `%${q}%` };
  if (category) where.category = category;

  const items = await Group.findAll({ where, limit, offset, order: [["name", "ASC"]] });
  await redis.setex(key, 60, JSON.stringify(items));
  return items;
}

export async function getGroup(id) {
  return Group.findByPk(id);
}

export async function updateGroup(id, data) {
  const g = await Group.findByPk(id);
  if (!g) return null;
  await g.update(data);
  await getRedis().flushall();
  return g;
}

export async function deleteGroup(id) {
  const g = await Group.findByPk(id);
  if (!g) return false;
  await g.destroy();
  await getRedis().flushall();
  return true;
}
