import { Router } from "express";
import { requireAuth, requireCoordinator, requireLeader } from "../config/passport.js";
import { createGroupCtrl, listGroupsCtrl, getGroupCtrl, updateGroupCtrl, deleteGroupCtrl } from "../controllers/groups.js";

const r = Router();

// Rutas públicas
r.get("/", listGroupsCtrl);           // listar grupos (público)
r.get("/:groupId", getGroupCtrl);     // obtener grupo específico (público)

// Rutas protegidas
r.post("/", requireAuth, requireCoordinator, createGroupCtrl);       // crear grupo (solo coordinadores y admins)
r.patch("/:groupId", requireAuth, requireLeader, updateGroupCtrl);   // actualizar grupo (líderes, coordinadores y admins)
r.delete("/:groupId", requireAuth, requireCoordinator, deleteGroupCtrl); // eliminar grupo (solo coordinadores y admins)

export default r;
