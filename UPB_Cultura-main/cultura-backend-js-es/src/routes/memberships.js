import { Router } from "express";
import { requireAuth } from "../config/passport.js";
import { 
  upsertMembershipCtrl, 
  listMembersCtrl, 
  updateMembershipCtrl, 
  removeMemberCtrl,
  joinGroupCtrl,
  leaveGroupCtrl,
  getUserMembershipsCtrl
} from "../controllers/memberships.js";

const r = Router();

// Rutas de membresías por grupo
r.get("/group/:groupId", requireAuth, listMembersCtrl); // listar miembros de un grupo
r.post("/", requireAuth, upsertMembershipCtrl);         // invitar/asignar rol (upsert)
r.patch("/:groupId/:userId", requireAuth, updateMembershipCtrl); // cambiar rol
r.delete("/:groupId/:userId", requireAuth, removeMemberCtrl);    // remover miembro

// Nuevas rutas para funcionalidad de unirse/salir de grupos
r.post("/:groupId/join", requireAuth, joinGroupCtrl);     // unirse a un grupo
r.delete("/:groupId/leave", requireAuth, leaveGroupCtrl); // salir de un grupo
r.get("/my-memberships", requireAuth, getUserMembershipsCtrl); // obtener membresías del usuario

export default r;
