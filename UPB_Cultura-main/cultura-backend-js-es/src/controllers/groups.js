import createError from "http-errors";
import * as svc from "../services/groups.js";
import { createGroupSchema, updateGroupSchema } from "../validation/groups.js";

export async function createGroupCtrl(req, res, next) {
  try {
    const { value, error } = createGroupSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const g = await svc.createGroup(value);
    res.status(201).json(g);
  } catch (err) { next(err); }
}

export async function listGroupsCtrl(req, res, next) {
  try {
    const { q, category, limit, offset } = req.query;
    const items = await svc.listGroups({ q, category, limit: Number(limit)||20, offset: Number(offset)||0 });
    res.json(items);
  } catch (err) { next(err); }
}

export async function getGroupCtrl(req, res, next) {
  try {
    const g = await svc.getGroup(req.params.groupId);
    if (!g) throw createError(404, "Grupo no encontrado");
    res.json(g);
  } catch (err) { next(err); }
}

export async function updateGroupCtrl(req, res, next) {
  try {
    const { value, error } = updateGroupSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const g = await svc.updateGroup(req.params.groupId, value);
    if (!g) throw createError(404, "Grupo no encontrado");
    res.json(g);
  } catch (err) { next(err); }
}

export async function deleteGroupCtrl(req, res, next) {
  try {
    const ok = await svc.deleteGroup(req.params.groupId);
    if (!ok) throw createError(404, "Grupo no encontrado");
    res.status(204).send();
  } catch (err) { next(err); }
}
