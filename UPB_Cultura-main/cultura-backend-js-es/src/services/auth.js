// Lógica de autenticación (registro/login dev). En producción usar SSO.
import bcrypt from "bcryptjs";
import { User, Role } from "../models/index.js";
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

export async function login({ email, password }) {
  try {
    console.log(`🔍 Intentando login para: ${email}`);
    
    // Buscar usuario por email con su rol
    const user = await User.findOne({ 
      where: { correo: email },
      include: [{ model: Role, as: "rol" }]
    });
    
    console.log(`👤 Usuario encontrado:`, user ? 'Sí' : 'No');
    
    if (!user) {
      console.log(`❌ Usuario no encontrado para email: ${email}`);
      throw new Error("Usuario o contraseña incorrecto");
    }
    
    if (!user.contrasena) {
      console.log(`❌ Usuario sin contraseña para email: ${email}`);
      throw new Error("Usuario o contraseña incorrecto");
    }
    
    // Comparar contraseña
    const ok = await bcrypt.compare(password, user.contrasena);
    console.log(`🔐 Contraseña válida:`, ok ? 'Sí' : 'No');
    
    if (!ok) {
      console.log(`❌ Contraseña incorrecta para email: ${email}`);
      throw new Error("Usuario o contraseña incorrecto");
    }
    
    // Obtener el nombre del rol
    const roleName = user.rol?.nombreRol || "usuario";
    console.log(`🎭 Rol del usuario: ${roleName}`);
    
    // Crear token con el rol
    const token = signToken(user.id, { 
      nombre: user.nombre, 
      correo: user.correo,
      role: roleName 
    });
    
    console.log(`✅ Login exitoso para: ${email}`);
    
    return { 
      token,
      user: {
        id: user.id,
        email: user.correo,
        name: user.nombre,
        role: roleName
      }
    };
  } catch (error) {
    console.log(`❌ Error en login para ${email}:`, error.message);
    throw error;
  }
}
