import createError from "http-errors";
import * as svc from "../services/messages.js";
import { sendMessageSchema } from "../validation/messages.js";

export async function sendMessageCtrl(req, res, next) {
  try {
    // Validar solo los campos que vienen del body (sin nombre y correo)
    const { value, error } = sendMessageSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    
    // Agregar nombre y correo del usuario autenticado
    const messageData = {
      ...value,
      nombreRemitente: req.user.nombre,
      correoRemitente: req.user.correo
    };
    
    const message = await svc.sendMessage(messageData);
    res.status(201).json(message);
  } catch (err) {
    if (err.message.includes('no encontrado')) {
      next(createError(404, err.message));
    } else {
      next(err);
    }
  }
}

export async function getMessagesByGroupCtrl(req, res, next) {
  try {
    const { groupId } = req.params;
    const messages = await svc.getMessagesByGroup(parseInt(groupId));
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

export async function markAsReadCtrl(req, res, next) {
  try {
    const { messageId } = req.params;
    const result = await svc.markAsRead(parseInt(messageId));
    res.json(result);
  } catch (err) {
    if (err.message.includes('no encontrado')) {
      next(createError(404, err.message));
    } else {
      next(err);
    }
  }
}

export async function getUnreadCountCtrl(req, res, next) {
  try {
    const { groupId } = req.params;
    const count = await svc.getUnreadCount(parseInt(groupId));
    res.json({ count });
  } catch (err) {
    next(err);
  }
}

