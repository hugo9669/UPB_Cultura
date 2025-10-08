import { Router } from "express";
import { requireAuth } from "../config/passport.js";
import { upsertMembershipCtrl, listMembersCtrl, updateMembershipCtrl, removeMemberCtrl } from "../controllers/memberships.js";

const r = Router();

// Rutas de membresías por grupo
r.get("/group/:groupId", requireAuth, listMembersCtrl); // listar miembros de un grupo
r.post("/", requireAuth, upsertMembershipCtrl);         // invitar/asignar rol (upsert)
r.patch("/:groupId/:userId", requireAuth, updateMembershipCtrl); // cambiar rol
r.delete("/:groupId/:userId", requireAuth, removeMemberCtrl);    // remover miembro

export default r;
