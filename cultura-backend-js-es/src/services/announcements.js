import { Announcement } from "../models/index.js";

export async function createAnnouncement({ groupId, authorId, title, content }) {
  return Announcement.create({ groupId, authorId, title, content });
}

export async function listAnnouncements({ groupId, limit = 20, offset = 0 }) {
  const where = {};
  if (groupId) where.groupId = groupId;
  return Announcement.findAll({ where, limit, offset, order: [["createdAt", "DESC"]] });
}

export async function updateAnnouncement(id, data) {
  const a = await Announcement.findByPk(id);
  if (!a) return null;
  await a.update(data);
  return a;
}

export async function deleteAnnouncement(id) {
  const a = await Announcement.findByPk(id);
  if (!a) return false;
  await a.destroy();
  return true;
}
