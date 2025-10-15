import { Router } from "express";
import { requireAuth, requireCoordinator } from "../config/passport.js";
import { createGroupCtrl, listGroupsCtrl, getGroupCtrl, updateGroupCtrl, deleteGroupCtrl } from "../controllers/groups.js";

const r = Router();

// Rutas públicas
r.get("/", listGroupsCtrl);           // listar grupos (público)
r.get("/:groupId", getGroupCtrl);     // obtener grupo específico (público)

// Rutas protegidas (solo coordinadores y admins)
r.post("/", requireAuth, requireCoordinator, createGroupCtrl);       // crear grupo
r.patch("/:groupId", requireAuth, requireCoordinator, updateGroupCtrl); // actualizar grupo
r.delete("/:groupId", requireAuth, requireCoordinator, deleteGroupCtrl); // eliminar grupo

export default r;
