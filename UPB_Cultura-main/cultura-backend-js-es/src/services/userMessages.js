import { UserMessage, User, Group, Event, Membership } from "../models/index.js";
import createError from "http-errors";
import { Op } from "sequelize";

/**
 * Enviar mensaje a uno o varios usuarios del grupo
 */
export async function sendMessageToUsers({ 
  idRemitente, 
  idGrupo, 
  destinatarios, // Array de IDs de usuarios
  asunto, 
  mensaje, 
  idEvento = null 
}) {
  // Verificar que el remitente es el líder del grupo
  const grupo = await Group.findByPk(idGrupo);
  if (!grupo) throw createError(404, "Grupo cultural no encontrado");
  
  if (grupo.idLider !== idRemitente) {
    throw createError(403, "Solo el líder del grupo puede enviar mensajes a sus miembros");
  }

  // Verificar que todos los destinatarios son miembros del grupo
  const memberships = await Membership.findAll({
    where: {
      idGrupo,
      idUsuario: { [Op.in]: destinatarios }
    }
  });

  if (memberships.length !== destinatarios.length) {
    throw createError(400, "Algunos destinatarios no son miembros del grupo");
  }

  // Crear un mensaje para cada destinatario
  const mensajesCreados = [];
  for (const idDestinatario of destinatarios) {
    const nuevoMensaje = await UserMessage.create({
      idRemitente,
      idDestinatario,
      idGrupo,
      idEvento,
      asunto,
      mensaje,
      leido: false
    });
    mensajesCreados.push(nuevoMensaje);
  }

  return {
    count: mensajesCreados.length,
    mensajes: mensajesCreados
  };
}

/**
 * Obtener mensajes recibidos por un usuario
 */
export async function getMessagesForUser(userId, { readStatus = undefined, groupId = undefined } = {}) {
  const where = { idDestinatario: userId };
  
  if (readStatus !== undefined) {
    where.leido = readStatus;
  }
  
  if (groupId) {
    where.idGrupo = groupId;
  }

  const mensajes = await UserMessage.findAll({
    where,
    include: [
      {
        model: User,
        as: "remitente",
        attributes: ['id', 'nombre', 'correo']
      },
      {
        model: Group,
        as: "grupo",
        attributes: ['id', 'nombreGrupo']
      },
      {
        model: Event,
        as: "evento",
        attributes: ['id', 'titulo', 'fechaEvento'],
        required: false
      }
    ],
    order: [['fechaEnvio', 'DESC']]
  });

  return mensajes;
}

/**
 * Obtener mensajes enviados por un líder
 */
export async function getSentMessagesByLeader(leaderId, { groupId = undefined } = {}) {
  const where = { idRemitente: leaderId };
  
  if (groupId) {
    where.idGrupo = groupId;
  }

  const mensajes = await UserMessage.findAll({
    where,
    include: [
      {
        model: User,
        as: "destinatario",
        attributes: ['id', 'nombre', 'correo']
      },
      {
        model: Group,
        as: "grupo",
        attributes: ['id', 'nombreGrupo']
      },
      {
        model: Event,
        as: "evento",
        attributes: ['id', 'titulo', 'fechaEvento'],
        required: false
      }
    ],
    order: [['fechaEnvio', 'DESC']]
  });

  return mensajes;
}

/**
 * Marcar mensaje como leído
 */
export async function markUserMessageAsRead(messageId, userId) {
  const mensaje = await UserMessage.findByPk(messageId);
  
  if (!mensaje) throw createError(404, "Mensaje no encontrado");
  
  // Verificar que el usuario es el destinatario
  if (mensaje.idDestinatario !== userId) {
    throw createError(403, "No tienes permiso para marcar este mensaje");
  }

  mensaje.leido = true;
  mensaje.fechaLectura = new Date();
  await mensaje.save();

  return mensaje;
}

/**
 * Obtener conteo de mensajes no leídos por usuario
 */
export async function getUnreadCountForUser(userId) {
  const count = await UserMessage.count({
    where: {
      idDestinatario: userId,
      leido: false
    }
  });

  return { count };
}

/**
 * Obtener mensajes por grupo (para el líder)
 */
export async function getMessagesByGroup(groupId, leaderId) {
  // Verificar que el usuario es líder del grupo
  const grupo = await Group.findByPk(groupId);
  if (!grupo) throw createError(404, "Grupo cultural no encontrado");
  
  if (grupo.idLider !== leaderId) {
    throw createError(403, "No tienes permiso para ver los mensajes de este grupo");
  }

  const mensajes = await UserMessage.findAll({
    where: { idGrupo: groupId },
    include: [
      {
        model: User,
        as: "destinatario",
        attributes: ['id', 'nombre', 'correo']
      },
      {
        model: Event,
        as: "evento",
        attributes: ['id', 'titulo', 'fechaEvento'],
        required: false
      }
    ],
    order: [['fechaEnvio', 'DESC']]
  });

  return mensajes;
}

/**
 * Eliminar mensaje (solo el líder que lo envió)
 */
export async function deleteUserMessage(messageId, leaderId) {
  const mensaje = await UserMessage.findByPk(messageId);
  
  if (!mensaje) throw createError(404, "Mensaje no encontrado");
  
  if (mensaje.idRemitente !== leaderId) {
    throw createError(403, "Solo puedes eliminar tus propios mensajes");
  }

  await mensaje.destroy();
  
  return { success: true, message: "Mensaje eliminado correctamente" };
}

/**
 * Eliminar mensaje recibido (para que el usuario limpie su bandeja de notificaciones)
 */
export async function deleteReceivedUserMessage(messageId, userId) {
  const mensaje = await UserMessage.findByPk(messageId);
  
  if (!mensaje) throw createError(404, "Mensaje no encontrado");
  
  // Verificar que el usuario es el destinatario
  if (mensaje.idDestinatario !== userId) {
    throw createError(403, "Solo puedes eliminar mensajes que te han enviado");
  }

  await mensaje.destroy();
  
  return { success: true, message: "Mensaje eliminado correctamente" };
}

/**
 * Enviar mensaje de usuario a líder cultural
 */
export async function sendMessageToLeader({
  idRemitente,
  idGrupo,
  asunto,
  mensaje
}) {
  // Verificar que el grupo existe
  const grupo = await Group.findByPk(idGrupo);
  if (!grupo) throw createError(404, "Grupo cultural no encontrado");
  
  // Verificar que el grupo tiene un líder asignado
  if (!grupo.idLider) {
    throw createError(400, "Este grupo no tiene un líder asignado");
  }

  // Crear el mensaje para el líder
  const nuevoMensaje = await UserMessage.create({
    idRemitente,
    idDestinatario: grupo.idLider,
    idGrupo,
    idEvento: null,
    asunto,
    mensaje,
    leido: false
  });

  // Cargar el mensaje con las relaciones para retornarlo completo
  const mensajeCompleto = await UserMessage.findByPk(nuevoMensaje.id, {
    include: [
      {
        model: User,
        as: "remitente",
        attributes: ['id', 'nombre', 'correo']
      },
      {
        model: User,
        as: "destinatario",
        attributes: ['id', 'nombre', 'correo']
      },
      {
        model: Group,
        as: "grupo",
        attributes: ['id', 'nombreGrupo']
      }
    ]
  });

  return mensajeCompleto;
}

/**
 * Obtener mensajes recibidos por un líder (de usuarios)
 */
export async function getMessagesForLeader(leaderId, { readStatus = undefined, groupId = undefined } = {}) {
  const where = { idDestinatario: leaderId };
  
  if (readStatus !== undefined) {
    where.leido = readStatus;
  }
  
  if (groupId) {
    where.idGrupo = groupId;
  }

  const mensajes = await UserMessage.findAll({
    where,
    include: [
      {
        model: User,
        as: "remitente",
        attributes: ['id', 'nombre', 'correo']
      },
      {
        model: Group,
        as: "grupo",
        attributes: ['id', 'nombreGrupo']
      },
      {
        model: Event,
        as: "evento",
        attributes: ['id', 'titulo', 'fechaEvento'],
        required: false
      }
    ],
    order: [['fechaEnvio', 'DESC']]
  });

  return mensajes;
}

