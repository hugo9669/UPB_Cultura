import { Router } from "express";
import { requireAuth } from "../config/passport.js";
import { createGroupCtrl, listGroupsCtrl, getGroupCtrl, updateGroupCtrl, deleteGroupCtrl } from "../controllers/groups.js";

const r = Router();

// CRUD de grupos
r.post("/", requireAuth, createGroupCtrl);      // crear grupo (coordinadores/admin)
r.get("/", listGroupsCtrl);                     // público: listar
r.get("/:groupId", getGroupCtrl);               // público: detalle
r.patch("/:groupId", requireAuth, updateGroupCtrl);
r.delete("/:groupId", requireAuth, deleteGroupCtrl);

export default r;
