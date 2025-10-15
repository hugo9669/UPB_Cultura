import createError from "http-errors";
import * as svc from "../services/memberships.js";
import { upsertMembershipSchema, updateMembershipSchema } from "../validation/memberships.js";

export async function upsertMembershipCtrl(req, res, next) {
  try {
    const { value, error } = upsertMembershipSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const m = await svc.upsertMembership(value);
    res.status(201).json(m);
  } catch (err) { next(err); }
}

export async function listMembersCtrl(req, res, next) {
  try {
    const { groupId } = req.params;
    const items = await svc.listMembers(groupId);
    res.json(items);
  } catch (err) { next(err); }
}

export async function updateMembershipCtrl(req, res, next) {
  try {
    const { value, error } = updateMembershipSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const m = await svc.upsertMembership({ userId: req.params.userId, groupId: req.params.groupId, role: value.role });
    res.json(m);
  } catch (err) { next(err); }
}

export async function removeMemberCtrl(req, res, next) {
  try {
    const ok = await svc.removeMember({ userId: req.params.userId, groupId: req.params.groupId });
    if (!ok) throw createError(404, "Miembro no encontrado");
    res.status(204).send();
  } catch (err) { next(err); }
}

// Nuevos endpoints para funcionalidad de unirse/salir de grupos
export async function joinGroupCtrl(req, res, next) {
  try {
    const { groupId } = req.params;
    const userId = req.user.id; // Asumiendo que el usuario está autenticado
    
    const membership = await svc.joinGroup(userId, groupId);
    res.status(201).json(membership);
  } catch (err) { next(err); }
}

export async function leaveGroupCtrl(req, res, next) {
  try {
    const { groupId } = req.params;
    const userId = req.user.id; // Asumiendo que el usuario está autenticado
    
    const success = await svc.leaveGroup(userId, groupId);
    if (!success) throw createError(404, "No eres miembro de este grupo");
    res.status(204).send();
  } catch (err) { next(err); }
}

export async function getUserMembershipsCtrl(req, res, next) {
  try {
    const userId = req.user.id; // Asumiendo que el usuario está autenticado
    const memberships = await svc.getUserMemberships(userId);
    res.json(memberships);
  } catch (err) { next(err); }
}