import createError from "http-errors";
import * as svc from "../services/userMessages.js";
import { sendUserMessageSchema, markAsReadSchema } from "../validation/userMessages.js";

/**
 * Enviar mensaje a usuarios del grupo (solo líder)
 */
export async function sendUserMessageCtrl(req, res, next) {
  try {
    const { value, error } = sendUserMessageSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    
    // El remitente es el usuario autenticado (líder)
    const idRemitente = req.user.id;
    
    const result = await svc.sendMessageToUsers({
      idRemitente,
      ...value
    });
    
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener mensajes recibidos por el usuario autenticado
 */
export async function getUserMessagesCtrl(req, res, next) {
  try {
    const userId = req.user.id;
    const { readStatus, groupId } = req.query;

    let parsedReadStatus;
    if (readStatus === 'true') parsedReadStatus = true;
    else if (readStatus === 'false') parsedReadStatus = false;
    else parsedReadStatus = undefined;

    const mensajes = await svc.getMessagesForUser(userId, {
      readStatus: parsedReadStatus,
      groupId: groupId ? parseInt(groupId) : undefined
    });
    
    res.json(mensajes);
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener mensajes enviados por el líder
 */
export async function getSentMessagesCtrl(req, res, next) {
  try {
    const leaderId = req.user.id;
    const { groupId } = req.query;

    const mensajes = await svc.getSentMessagesByLeader(leaderId, {
      groupId: groupId ? parseInt(groupId) : undefined
    });
    
    res.json(mensajes);
  } catch (err) {
    next(err);
  }
}

/**
 * Marcar mensaje como leído
 */
export async function markUserMessageAsReadCtrl(req, res, next) {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const mensaje = await svc.markUserMessageAsRead(parseInt(messageId), userId);
    
    res.json(mensaje);
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener conteo de mensajes no leídos
 */
export async function getUnreadCountCtrl(req, res, next) {
  try {
    const userId = req.user.id;
    const count = await svc.getUnreadCountForUser(userId);
    
    res.json(count);
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener mensajes por grupo (para el líder)
 */
export async function getMessagesByGroupCtrl(req, res, next) {
  try {
    const { groupId } = req.params;
    const leaderId = req.user.id;

    const mensajes = await svc.getMessagesByGroup(parseInt(groupId), leaderId);
    
    res.json(mensajes);
  } catch (err) {
    next(err);
  }
}

/**
 * Eliminar mensaje (para el líder que lo envió)
 */
export async function deleteUserMessageCtrl(req, res, next) {
  try {
    const { messageId } = req.params;
    const leaderId = req.user.id;

    const result = await svc.deleteUserMessage(parseInt(messageId), leaderId);
    
    res.json(result);
  } catch (err) {
    next(err);
  }
}

/**
 * Eliminar mensaje recibido (para el usuario destinatario)
 */
export async function deleteReceivedUserMessageCtrl(req, res, next) {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const result = await svc.deleteReceivedUserMessage(parseInt(messageId), userId);
    
    res.json(result);
  } catch (err) {
    next(err);
  }
}

/**
 * Enviar mensaje de usuario a líder cultural
 */
export async function sendMessageToLeaderCtrl(req, res, next) {
  try {
    const { idGrupo, asunto, mensaje } = req.body;
    
    if (!idGrupo || !asunto || !mensaje) {
      throw createError(400, "idGrupo, asunto y mensaje son requeridos");
    }
    
    // El remitente es el usuario autenticado
    const idRemitente = req.user.id;
    
    const result = await svc.sendMessageToLeader({
      idRemitente,
      idGrupo: parseInt(idGrupo),
      asunto,
      mensaje
    });
    
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener mensajes recibidos por el líder (de usuarios)
 */
export async function getMessagesForLeaderCtrl(req, res, next) {
  try {
    const leaderId = req.user.id;
    const { readStatus, groupId } = req.query;

    let parsedReadStatus;
    if (readStatus === 'true') parsedReadStatus = true;
    else if (readStatus === 'false') parsedReadStatus = false;
    else parsedReadStatus = undefined;

    const mensajes = await svc.getMessagesForLeader(leaderId, {
      readStatus: parsedReadStatus,
      groupId: groupId ? parseInt(groupId) : undefined
    });
    
    res.json(mensajes);
  } catch (err) {
    next(err);
  }
}

