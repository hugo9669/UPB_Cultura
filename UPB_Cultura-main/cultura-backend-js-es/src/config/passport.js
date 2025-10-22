// Configuración de Passport: JWT y OAuth2 (placeholder UPB)
// TODO: Conectar con el IdP real de UPB (OpenID Connect) y mapear claims -> usuario local.
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import OAuth2Strategy from "passport-oauth2";
import { JWT_SECRET, OAUTH2, FRONT_AFTER_LOGIN_URL } from "./env.js";
import { User } from "../models/index.js";
import { signToken } from "../utils/jwt.js";

export function passportInit(app) {
  // Estrategia JWT para proteger rutas con Bearer token
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  }, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.sub);
      if (!user) return done(null, false);
      
      // Incluir nombre y correo para usarlos en la mensajería
      return done(null, { 
        id: user.id, 
        username: user.nombre || 'Usuario',
        nombre: user.nombre,
        correo: user.correo,
        role: payload.role || 'usuario' 
      });
    } catch (err) {
      return done(err, false);
    }
  }));

  // Estrategia OAuth2 (placeholder): completa con URLs del IdP y obtén userinfo
  passport.use("upb", new OAuth2Strategy({
    authorizationURL: OAUTH2.AUTH_URL || "https://example.com/oauth/authorize",
    tokenURL: OAUTH2.TOKEN_URL || "https://example.com/oauth/token",
    clientID: OAUTH2.CLIENT_ID || "dev-client",
    clientSecret: OAUTH2.CLIENT_SECRET || "dev-secret",
    callbackURL: OAUTH2.CALLBACK_URL || "http://localhost:4000/auth/oauth2/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // TODO: llamar al endpoint userinfo del IdP con accessToken para obtener email/nombre
      const email = profile?.email || `user${Date.now()}@upb.edu.co`; // placeholder
      let user = await User.findOne({ where: { email } });
      if (!user) {
        user = await User.create({
          email,
          username: email.split("@")[0],
          fullName: "UPB User",
          role: "student",
          passwordHash: null // SSO puro
        });
      }
      // Emitimos JWT para el Front
      const jwt = signToken(user.id, { username: user.username, role: user.role });
      return done(null, { jwt });
    } catch (err) {
      return done(err, false);
    }
  }));

  app.use(passport.initialize());
}

export const requireAuth = passport.authenticate("jwt", { session: false });

// Middleware de autorización por roles
export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acceso denegado. Rol insuficiente.' });
    }
    
    next();
  };
};

// Middleware específico para coordinadores
export const requireCoordinator = requireRole(['coordinator', 'admin', 'administrador']);

// Middleware específico para administradores
export const requireAdmin = requireRole(['admin', 'administrador']);

// Middleware específico para líderes culturales (permite también coordinadores y admins)
export const requireLeader = requireRole(['Lcultural', 'coordinator', 'admin', 'administrador']);

// Helper para redirigir al Front después del SSO con el token como query param
export function redirectWithToken(res, token) {
  // TODO: si prefieres cookie HttpOnly, setear aquí en lugar de query
  const url = new URL(FRONT_AFTER_LOGIN_URL);
  url.searchParams.set("token", token);
  res.redirect(url.toString());
}
