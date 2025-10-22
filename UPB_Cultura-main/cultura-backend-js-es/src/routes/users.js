import { Router } from "express";
import { requireAuth, requireLeader, requireAdmin } from "../config/passport.js";
import { listUsersCtrl, createUserCtrl, updateUserCtrl } from "../controllers/users.js";

const r = Router();

// Rutas protegidas
r.get("/", requireAuth, requireLeader, listUsersCtrl);           // listar usuarios (líderes pueden ver)
r.post("/", requireAuth, requireAdmin, createUserCtrl);          // crear usuario (SOLO administradores)
r.patch("/:userId", requireAuth, requireAdmin, updateUserCtrl);  // actualizar usuario (SOLO administradores)

export default r;

