// Lógica de autenticación (registro/login dev). En producción usar SSO.
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { signToken } from "../utils/jwt.js";

export async function register({ username, email, fullName, password }) {
  const exists = await User.findOne({ where: { username } });
  if (exists) throw new Error("El nombre de usuario ya existe");
  const existsEmail = await User.findOne({ where: { email } });
  if (existsEmail) throw new Error("El email ya existe");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, fullName, passwordHash, role: "student" });
  return { id: user.id, username: user.username, email: user.email, fullName: user.fullName };
}

export async function login({ username, password }) {
  const user = await User.findOne({ where: { username } });
  if (!user || !user.passwordHash) throw new Error("Credenciales inválidas");
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error("Credenciales inválidas");
  const token = signToken(user.id, { username: user.username, role: user.role });
  return { access_token: token, token_type: "bearer" };
}
