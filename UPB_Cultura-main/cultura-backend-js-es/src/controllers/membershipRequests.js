import createError from "http-errors";
import * as svc from "../services/membershipRequests.js";
import { createMembershipRequestSchema, updateMembershipRequestSchema } from "../validation/membershipRequests.js";

/**
 * Crear una solicitud de membresía (usuario)
 */
export async function createMembershipRequestCtrl(req, res, next) {
  try {
    const { value, error } = createMembershipRequestSchema.validate(req.body);
    if (error) throw createError(400, error.message);

    const requestData = {
      idUsuario: req.user.id, // Del token JWT
      ...value
    };

    const request = await svc.createMembershipRequest(requestData);
    res.status(201).json(request);
  } catch (err) {
    if (err.message.includes('no encontrado') || err.message.includes('Ya eres miembro') || err.message.includes('pendiente')) {
      next(createError(err.statusCode || 400, err.message));
    } else {
      next(err);
    }
  }
}

/**
 * Listar solicitudes de un grupo (líder)
 */
export async function listGroupRequestsCtrl(req, res, next) {
  try {
    const { groupId } = req.params;
    const { estado } = req.query;

    const requests = await svc.listGroupRequests(parseInt(groupId), { estado });
    res.json(requests);
  } catch (err) {
    next(err);
  }
}

/**
 * Listar solicitudes del usuario autenticado
 */
export async function listMyRequestsCtrl(req, res, next) {
  try {
    const { estado } = req.query;
    const requests = await svc.listUserRequests(req.user.id, { estado });
    res.json(requests);
  } catch (err) {
    next(err);
  }
}

/**
 * Aprobar o rechazar una solicitud (líder)
 */
export async function updateMembershipRequestCtrl(req, res, next) {
  try {
    const { requestId } = req.params;
    const { value, error} = updateMembershipRequestSchema.validate(req.body);
    if (error) throw createError(400, error.message);

    const request = await svc.updateMembershipRequest(
      parseInt(requestId),
      req.user.id, // ID del líder
      value
    );
    res.json(request);
  } catch (err) {
    if (err.message.includes('no encontrada') || err.message.includes('No tienes permiso') || err.message.includes('procesada')) {
      next(createError(err.statusCode || 400, err.message));
    } else {
      next(err);
    }
  }
}

/**
 * Obtener contador de solicitudes pendientes (líder)
 */
export async function getPendingRequestsCountCtrl(req, res, next) {
  try {
    const { groupId } = req.params;
    const count = await svc.getPendingRequestsCount(parseInt(groupId));
    res.json(count);
  } catch (err) {
    next(err);
  }
}

/**
 * Cancelar solicitud propia (usuario)
 */
export async function deleteMembershipRequestCtrl(req, res, next) {
  try {
    const { requestId } = req.params;
    const result = await svc.deleteMembershipRequest(parseInt(requestId), req.user.id);
    res.json(result);
  } catch (err) {
    if (err.message.includes('no encontrada') || err.message.includes('No tienes permiso') || err.message.includes('pendientes')) {
      next(createError(err.statusCode || 400, err.message));
    } else {
      next(err);
    }
  }
}

/**
 * Eliminar notificación de solicitud procesada (usuario)
 */
export async function deleteProcessedMembershipRequestCtrl(req, res, next) {
  try {
    const { requestId } = req.params;
    const result = await svc.deleteProcessedMembershipRequest(parseInt(requestId), req.user.id);
    res.json(result);
  } catch (err) {
    if (err.message.includes('no encontrada') || err.message.includes('No tienes permiso') || err.message.includes('pendientes')) {
      next(createError(err.statusCode || 400, err.message));
    } else {
      next(err);
    }
  }
}

/**
 * Eliminar solicitud procesada por el líder del grupo
 */
export async function deleteProcessedRequestByLeaderCtrl(req, res, next) {
  try {
    const { requestId } = req.params;
    const result = await svc.deleteProcessedRequestByLeader(parseInt(requestId), req.user.id);
    res.json(result);
  } catch (err) {
    if (err.message.includes('no encontrada') || err.message.includes('No tienes permiso') || err.message.includes('pendientes')) {
      next(createError(err.statusCode || 400, err.message));
    } else {
      next(err);
    }
  }
}

