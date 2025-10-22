import bcrypt from "bcryptjs";
import { User, Role } from "../models/index.js";

export async function listUsers({ role } = {}) {
  const where = {};
  
  // Si se especifica un rol, filtrar por ese rol
  if (role) {
    const roleData = await Role.findOne({ where: { nombreRol: role } });
    if (roleData) {
      where.idRol = roleData.id;
    }
  }
  
  const users = await User.findAll({
    where,
    include: [{ model: Role, as: "rol" }],
    attributes: ['id', 'nombre', 'correo', 'idRol'],
    order: [['nombre', 'ASC']]
  });
  
  return users.map(u => ({
    id: u.id,
    name: u.nombre,
    email: u.correo,
    role: u.rol?.nombreRol || 'usuario'
  }));
}

export async function createUser({ nombre, correo, contrasena, rol = 'usuario' }) {
  // Verificar que el correo no exista
  const existsEmail = await User.findOne({ where: { correo } });
  if (existsEmail) throw new Error("El correo ya existe");
  
  // Obtener el ID del rol
  let idRol = 3; // Por defecto rol 'usuario'
  const roleData = await Role.findOne({ where: { nombreRol: rol } });
  if (roleData) {
    idRol = roleData.id;
  }
  
  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(contrasena, 10);
  
  // Crear el usuario
  const user = await User.create({
    nombre,
    correo,
    contrasena: hashedPassword,
    idRol
  });
  
  return {
    id: user.id,
    name: user.nombre,
    email: user.correo,
    role: rol
  };
}

export async function updateUser(userId, { nombre, correo, contrasena, rol }) {
  // Verificar que el usuario exista
  const user = await User.findByPk(userId, {
    include: [{ model: Role, as: "rol" }]
  });
  if (!user) throw new Error("Usuario no encontrado");
  
  // Si se está cambiando el correo, verificar que no exista otro usuario con ese correo
  if (correo && correo !== user.correo) {
    const existsEmail = await User.findOne({ where: { correo } });
    if (existsEmail) throw new Error("El correo ya está en uso por otro usuario");
  }
  
  // Preparar los datos a actualizar
  const updateData = {};
  if (nombre) updateData.nombre = nombre;
  if (correo) updateData.correo = correo;
  
  // Si se proporciona una contraseña, hashearla
  if (contrasena && contrasena.trim() !== '') {
    updateData.contrasena = await bcrypt.hash(contrasena, 10);
  }
  
  // Si se proporciona un rol, obtener su ID
  if (rol) {
    const roleData = await Role.findOne({ where: { nombreRol: rol } });
    if (roleData) {
      updateData.idRol = roleData.id;
    }
  }
  
  // Actualizar el usuario
  await user.update(updateData);
  
  // Recargar el usuario con el rol actualizado
  await user.reload({ include: [{ model: Role, as: "rol" }] });
  
  return {
    id: user.id,
    name: user.nombre,
    email: user.correo,
    role: user.rol?.nombreRol || 'usuario'
  };
}

