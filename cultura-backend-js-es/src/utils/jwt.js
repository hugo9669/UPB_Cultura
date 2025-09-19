import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// Firma un JWT con subject = id del usuario
export function signToken(sub, extra = {}) {
  return jwt.sign({ ...extra }, JWT_SECRET, { subject: String(sub), expiresIn: JWT_EXPIRES_IN });
}
