import { Router } from "express";
import { registerCtrl, loginCtrl, startOAuth2, oauth2Callback } from "../controllers/auth.js";

const r = Router();

// Auth dev (usuario/contraseña) – Para producción preferir SSO
r.post("/register", registerCtrl);
r.post("/login", loginCtrl);

// Flujo OAuth2 (SSO UPB)
r.get("/oauth2", startOAuth2);
r.get("/oauth2/callback", oauth2Callback);

export default r;
