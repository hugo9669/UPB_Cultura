import { Router } from "express";
<<<<<<< HEAD
import { requireAuth, requireCoordinator, requireLeader } from "../config/passport.js";
=======
import { requireAuth, requireCoordinator } from "../config/passport.js";
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
import { createGroupCtrl, listGroupsCtrl, getGroupCtrl, updateGroupCtrl, deleteGroupCtrl } from "../controllers/groups.js";

const r = Router();

// Rutas públicas
r.get("/", listGroupsCtrl);           // listar grupos (público)
r.get("/:groupId", getGroupCtrl);     // obtener grupo específico (público)

<<<<<<< HEAD
// Rutas protegidas
r.post("/", requireAuth, requireCoordinator, createGroupCtrl);       // crear grupo (solo coordinadores y admins)
r.patch("/:groupId", requireAuth, requireLeader, updateGroupCtrl);   // actualizar grupo (líderes, coordinadores y admins)
r.delete("/:groupId", requireAuth, requireCoordinator, deleteGroupCtrl); // eliminar grupo (solo coordinadores y admins)
=======
// Rutas protegidas (solo coordinadores y admins)
r.post("/", requireAuth, requireCoordinator, createGroupCtrl);       // crear grupo
r.patch("/:groupId", requireAuth, requireCoordinator, updateGroupCtrl); // actualizar grupo
r.delete("/:groupId", requireAuth, requireCoordinator, deleteGroupCtrl); // eliminar grupo
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628

export default r;
