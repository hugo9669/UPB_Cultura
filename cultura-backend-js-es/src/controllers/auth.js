import createError from "http-errors";
import passport from "passport";
import { register, login } from "../services/auth.js";
import { registerSchema, loginSchema } from "../validation/auth.js";
import { redirectWithToken } from "../config/passport.js";

export async function registerCtrl(req, res, next) {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const user = await register(value);
    res.status(201).json(user);
  } catch (err) { next(err); }
}

export async function loginCtrl(req, res, next) {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) throw createError(400, error.message);
    const token = await login(value);
    res.json(token);
  } catch (err) { next(err); }
}

// Inicio del flujo OAuth2 (UPB) → redirige al IdP
export const startOAuth2 = passport.authenticate("upb");

// Callback del IdP: aquí emitimos token y redirigimos al Front
export function oauth2Callback(req, res, next) {
  passport.authenticate("upb", { session: false }, (err, data) => {
    if (err || !data?.jwt) return next(createError(401, "Fallo en OAuth2"));
    // Redirigimos al Front con el token como query param (?token=...)
    redirectWithToken(res, data.jwt);
  })(req, res, next);
}
