import { MembershipRequest, User, Group, Membership, Category } from "../models/index.js";
import createError from "http-errors";

/**
 * Crear una solicitud de membresía
 */
export async function createMembershipRequest({ idUsuario, idGrupo, motivacion, experiencia }) {
  // Verificar que el grupo existe
  const group = await Group.findByPk(idGrupo);
  if (!group) throw createError(404, "Grupo cultural no encontrado");

  // Verificar que el usuario no sea ya miembro del grupo
  const existingMembership = await Membership.findOne({
    where: { idUsuario, idGrupo }
  });
  if (existingMembership) {
    throw createError(400, "Ya eres miembro de este grupo cultural");
  }

  // Verificar que no tenga una solicitud pendiente
  const existingRequest = await MembershipRequest.findOne({
    where: { idUsuario, idGrupo, estado: 'pendiente' }
  });
  if (existingRequest) {
    throw createError(400, "Ya tienes una solicitud pendiente para este grupo");
  }

  // Crear la solicitud
  const request = await MembershipRequest.create({
    idUsuario,
    idGrupo,
    motivacion,
    experiencia: experiencia || null
  });

  return request;
}

/**
 * Listar solicitudes de un grupo (para el líder)
 */
export async function listGroupRequests(groupId, { estado = undefined } = {}) {
  const where = { idGrupo: groupId };
  if (estado) {
    where.estado = estado;
  }

  const requests = await MembershipRequest.findAll({
    where,
    include: [
      {
        model: User,
        as: "usuario",
        attributes: ['id', 'nombre', 'correo']
      }
    ],
    order: [['fechaSolicitud', 'DESC']]
  });

  return requests;
}

/**
 * Listar solicitudes de un usuario
 */
export async function listUserRequests(userId, { estado = undefined } = {}) {
  const where = { idUsuario: userId };
  if (estado) {
    where.estado = estado;
  }

  const requests = await MembershipRequest.findAll({
    where,
    include: [
      {
        model: Group,
        as: "grupo",
        attributes: ['id', 'nombreGrupo', 'urlLogo'],
        include: [
          {
            model: Category,
            as: "categoria",
            attributes: ['id', 'nombreCategoria']
          }
        ]
      }
    ],
    order: [['fechaSolicitud', 'DESC']]
  });

  return requests;
}

/**
 * Aprobar o rechazar una solicitud (solo líder del grupo)
 */
export async function updateMembershipRequest(requestId, leaderId, { estado, mensajeRespuesta }) {
  const request = await MembershipRequest.findByPk(requestId, {
    include: [
      {
        model: Group,
        as: "grupo"
      }
    ]
  });

  if (!request) throw createError(404, "Solicitud no encontrada");

  // Verificar que el líder es el líder del grupo
  if (request.grupo.idLider !== leaderId) {
    throw createError(403, "No tienes permiso para gestionar esta solicitud");
  }

  // Verificar que la solicitud esté pendiente
  if (request.estado !== 'pendiente') {
    throw createError(400, "Esta solicitud ya ha sido procesada");
  }

  // Actualizar el estado
  request.estado = estado;
  request.fechaRespuesta = new Date();
  request.mensajeRespuesta = mensajeRespuesta || null;
  await request.save();

  // Si se aprueba, crear la membresía
  if (estado === 'aprobada') {
    await Membership.create({
      idUsuario: request.idUsuario,
      idGrupo: request.idGrupo,
      fechaUnion: new Date()
    });
  }

  return request;
}

/**
 * Obtener contador de solicitudes pendientes (para el líder)
 */
export async function getPendingRequestsCount(groupId) {
  const count = await MembershipRequest.count({
    where: {
      idGrupo: groupId,
      estado: 'pendiente'
    }
  });
  return { count };
}

/**
 * Eliminar una solicitud (usuario puede cancelar su propia solicitud)
 */
export async function deleteMembershipRequest(requestId, userId) {
  const request = await MembershipRequest.findByPk(requestId);
  if (!request) throw createError(404, "Solicitud no encontrada");

  // Verificar que es el usuario que hizo la solicitud y que esté pendiente
  if (request.idUsuario !== userId) {
    throw createError(403, "No tienes permiso para eliminar esta solicitud");
  }

  if (request.estado !== 'pendiente') {
    throw createError(400, "Solo puedes cancelar solicitudes pendientes");
  }

  await request.destroy();
  return { message: "Solicitud cancelada exitosamente" };
}

/**
 * Eliminar una solicitud procesada (aprobada/rechazada) - para limpiar notificaciones
 */
export async function deleteProcessedMembershipRequest(requestId, userId) {
  const request = await MembershipRequest.findByPk(requestId);
  if (!request) throw createError(404, "Solicitud no encontrada");

  // Verificar que es el usuario que hizo la solicitud
  if (request.idUsuario !== userId) {
    throw createError(403, "No tienes permiso para eliminar esta solicitud");
  }

  // Solo se pueden eliminar solicitudes aprobadas o rechazadas
  if (request.estado === 'pendiente') {
    throw createError(400, "No puedes eliminar solicitudes pendientes. Usa la opción de cancelar.");
  }

  await request.destroy();
  return { message: "Notificación eliminada exitosamente" };
}

/**
 * Eliminar solicitud procesada por el líder del grupo
 */
export async function deleteProcessedRequestByLeader(requestId, leaderId) {
  const request = await MembershipRequest.findByPk(requestId, {
    include: [
      {
        model: Group,
        as: "grupo"
      }
    ]
  });

  if (!request) throw createError(404, "Solicitud no encontrada");

  // Verificar que el usuario es el líder del grupo
  if (request.grupo.idLider !== leaderId) {
    throw createError(403, "No tienes permiso para eliminar esta solicitud");
  }

  // Solo se pueden eliminar solicitudes aprobadas o rechazadas
  if (request.estado === 'pendiente') {
    throw createError(400, "No puedes eliminar solicitudes pendientes. Primero debes aprobarlas o rechazarlas.");
  }

  await request.destroy();
  return { message: "Solicitud eliminada exitosamente" };
}

