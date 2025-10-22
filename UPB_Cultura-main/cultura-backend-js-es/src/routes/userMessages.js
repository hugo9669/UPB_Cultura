import { Router } from "express";
import { requireAuth, requireLeader } from "../config/passport.js";
import {
  sendUserMessageCtrl,
  getUserMessagesCtrl,
  getSentMessagesCtrl,
  markUserMessageAsReadCtrl,
  getUnreadCountCtrl,
  getMessagesByGroupCtrl,
  deleteUserMessageCtrl,
  deleteReceivedUserMessageCtrl,
  sendMessageToLeaderCtrl,
  getMessagesForLeaderCtrl
} from "../controllers/userMessages.js";

const r = Router();

// Enviar mensaje a usuarios (solo líderes)
r.post("/", requireAuth, requireLeader, sendUserMessageCtrl);

// Enviar mensaje a líder cultural (cualquier usuario autenticado)
r.post("/to-leader", requireAuth, sendMessageToLeaderCtrl);

// Obtener mensajes recibidos por el usuario autenticado
r.get("/received", requireAuth, getUserMessagesCtrl);

// Obtener mensajes recibidos por el líder (de usuarios)
r.get("/leader-inbox", requireAuth, requireLeader, getMessagesForLeaderCtrl);

// Obtener mensajes enviados por el líder
r.get("/sent", requireAuth, requireLeader, getSentMessagesCtrl);

// Obtener conteo de mensajes no leídos
r.get("/unread-count", requireAuth, getUnreadCountCtrl);

// Obtener mensajes de un grupo específico (para el líder)
r.get("/group/:groupId", requireAuth, requireLeader, getMessagesByGroupCtrl);

// Marcar mensaje como leído
r.patch("/:messageId/read", requireAuth, markUserMessageAsReadCtrl);

// Eliminar mensaje recibido (para el usuario destinatario)
r.delete("/:messageId/received", requireAuth, deleteReceivedUserMessageCtrl);

// Eliminar mensaje (solo el líder que lo envió)
r.delete("/:messageId", requireAuth, requireLeader, deleteUserMessageCtrl);

export default r;

