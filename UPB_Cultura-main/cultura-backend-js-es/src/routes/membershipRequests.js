import { Router } from "express";
import { requireAuth, requireLeader } from "../config/passport.js";
import {
  createMembershipRequestCtrl,
  listGroupRequestsCtrl,
  listMyRequestsCtrl,
  updateMembershipRequestCtrl,
  getPendingRequestsCountCtrl,
  deleteMembershipRequestCtrl,
  deleteProcessedMembershipRequestCtrl,
  deleteProcessedRequestByLeaderCtrl
} from "../controllers/membershipRequests.js";

const r = Router();

// Rutas para usuarios (crear y ver sus propias solicitudes)
r.post("/", requireAuth, createMembershipRequestCtrl);
r.get("/my", requireAuth, listMyRequestsCtrl);
r.delete("/:requestId", requireAuth, deleteMembershipRequestCtrl); // Cancelar solicitud pendiente
r.delete("/:requestId/notification", requireAuth, deleteProcessedMembershipRequestCtrl); // Eliminar notificación de solicitud procesada

// Rutas para líderes (ver y gestionar solicitudes de su grupo)
r.get("/group/:groupId", requireAuth, requireLeader, listGroupRequestsCtrl);
r.get("/group/:groupId/pending-count", requireAuth, requireLeader, getPendingRequestsCountCtrl);
r.patch("/:requestId", requireAuth, requireLeader, updateMembershipRequestCtrl);
r.delete("/:requestId/leader", requireAuth, requireLeader, deleteProcessedRequestByLeaderCtrl); // Eliminar solicitud procesada por el líder

export default r;

