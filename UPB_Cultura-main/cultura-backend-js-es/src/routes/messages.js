import { Router } from "express";
import { requireAuth, requireLeader, requireAdmin } from "../config/passport.js";
import { 
  sendMessageCtrl, 
  getMessagesByGroupCtrl, 
  markAsReadCtrl,
  getUnreadCountCtrl 
} from "../controllers/messages.js";

const r = Router();

// Rutas protegidas (solo administradores)
r.post("/", requireAuth, requireAdmin, sendMessageCtrl);  // Enviar mensaje (SOLO administradores)

// Rutas protegidas (solo líderes)
r.get("/group/:groupId", requireAuth, requireLeader, getMessagesByGroupCtrl);  // Ver mensajes de un grupo
r.get("/group/:groupId/unread", requireAuth, requireLeader, getUnreadCountCtrl);  // Contar no leídos
r.patch("/:messageId/read", requireAuth, requireLeader, markAsReadCtrl);  // Marcar como leído

export default r;

