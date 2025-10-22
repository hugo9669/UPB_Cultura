import { Membership, User, Group, Category } from "../models/index.js";

export async function upsertMembership({ userId, groupId, role }) {
  // Convertir a números si vienen como strings
  const idUsuario = typeof userId === 'string' ? parseInt(userId) : userId;
  const idGrupo = typeof groupId === 'string' ? parseInt(groupId) : groupId;
  
  const [m, created] = await Membership.findOrCreate({
    where: { idUsuario, idGrupo },
    defaults: { 
      idUsuario, 
      idGrupo,
      fechaUnion: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
    }
  });
  
  return m;
}

export async function listMembers(groupId) {
  const members = await Membership.findAll({
    where: { idGrupo: groupId },
    include: [{ 
      model: User, 
      as: "usuario",
      attributes: ["id", "nombre", "correo"] 
    }],
    raw: false
  });
  
  // Transformar para que el frontend lo entienda
  return members.map(m => ({
    id: m.id,
    idUsuario: m.idUsuario,
    idGrupo: m.idGrupo,
    fechaUnion: m.fechaUnion,
    User: {
      id: m.usuario?.id,
      nombre: m.usuario?.nombre,
      correo: m.usuario?.correo,
      name: m.usuario?.nombre,
      email: m.usuario?.correo
    }
  }));
}

export async function removeMember({ userId, groupId }) {
  // Convertir a números si vienen como strings
  const idUsuario = typeof userId === 'string' ? parseInt(userId) : userId;
  const idGrupo = typeof groupId === 'string' ? parseInt(groupId) : groupId;
  
  const m = await Membership.findOne({ where: { idUsuario, idGrupo } });
  if (!m) return false;
  await m.destroy();
  return true;
}

// Nuevas funciones para gestión de membresías
export async function joinGroup(userId, groupId) {
  // Convertir a números si vienen como strings
  const idUsuario = typeof userId === 'string' ? parseInt(userId) : userId;
  const idGrupo = typeof groupId === 'string' ? parseInt(groupId) : groupId;
  
  // Verificar que el grupo existe
  const group = await Group.findByPk(idGrupo);
  if (!group) throw new Error("Grupo no encontrado");
  
  // Crear membresía como miembro por defecto
  const [membership, created] = await Membership.findOrCreate({
    where: { idUsuario, idGrupo },
    defaults: { 
      idUsuario,
      idGrupo,
      fechaUnion: new Date().toISOString().split('T')[0]
    }
  });
  
  if (!created) {
    throw new Error("Ya eres miembro de este grupo");
  }
  
  return membership;
}

export async function leaveGroup(userId, groupId) {
  // Convertir a números si vienen como strings
  const idUsuario = typeof userId === 'string' ? parseInt(userId) : userId;
  const idGrupo = typeof groupId === 'string' ? parseInt(groupId) : groupId;
  
  const membership = await Membership.findOne({ where: { idUsuario, idGrupo } });
  if (!membership) {
    throw new Error("No eres miembro de este grupo");
  }
  
  await membership.destroy();
  
  return true;
}

export async function getUserMemberships(userId) {
  const idUsuario = typeof userId === 'string' ? parseInt(userId) : userId;
  
  const memberships = await Membership.findAll({
    where: { idUsuario },
    include: [{ 
      model: Group,
      as: 'grupo',
      include: [{
        model: Category,
        as: 'categoria'
      }]
    }],
    order: [['fechaUnion', 'DESC']]
  });

  // Transformar datos para el frontend con conteo de miembros
  const result = await Promise.all(memberships.map(async (m) => {
    // Contar miembros del grupo
    const memberCount = await Membership.count({
      where: { idGrupo: m.grupo.id }
    });

    return {
      id: m.id,
      joinDate: m.fechaUnion,
      group: {
        id: m.grupo.id,
        name: m.grupo.nombreGrupo,
        description: m.grupo.descripcion,
        image: m.grupo.urlLogo,
        category: m.grupo.categoria?.nombreCategoria || 'General',
        members: memberCount
      }
    };
  }));

  return result;
}

export async function isMember(userId, groupId) {
  const idUsuario = typeof userId === 'string' ? parseInt(userId) : userId;
  const idGrupo = typeof groupId === 'string' ? parseInt(groupId) : groupId;
  
  const membership = await Membership.findOne({ where: { idUsuario, idGrupo } });
  return !!membership;
}

export async function isCoordinator(userId, groupId) {
  const idUsuario = typeof userId === 'string' ? parseInt(userId) : userId;
  const idGrupo = typeof groupId === 'string' ? parseInt(groupId) : groupId;
  
  // Ya no tenemos campo 'role' en el modelo, solo verificamos si es miembro
  // En el futuro podrías agregar un campo 'role' a la tabla si lo necesitas
  const membership = await Membership.findOne({ where: { idUsuario, idGrupo } });
  return !!membership;
}
