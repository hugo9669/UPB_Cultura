import createError from "http-errors";
import * as svc from "../services/users.js";
import { createUserSchema, updateUserSchema } from "../validation/users.js";

export async function listUsersCtrl(req, res, next) {
  try {
    const { role } = req.query;
    const users = await svc.listUsers({ role });
    res.json(users);
  } catch (err) { next(err); }
}

export async function createUserCtrl(req, res, next) {
  try {
    const { value, error } = createUserSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    
    const user = await svc.createUser(value);
    res.status(201).json(user);
  } catch (err) { 
    if (err.message.includes('ya existe')) {
      next(createError(400, err.message));
    } else {
      next(err);
    }
  }
}

export async function updateUserCtrl(req, res, next) {
  try {
    const { userId } = req.params;
    const { value, error } = updateUserSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    
    const user = await svc.updateUser(parseInt(userId), value);
    res.json(user);
  } catch (err) { 
    if (err.message.includes('no encontrado')) {
      next(createError(404, err.message));
    } else if (err.message.includes('ya está en uso')) {
      next(createError(400, err.message));
    } else {
      next(err);
    }
  }
}

