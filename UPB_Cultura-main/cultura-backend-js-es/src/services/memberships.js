import { Membership, User, Group } from "../models/index.js";

export async function upsertMembership({ userId, groupId, role }) {
  const [m, created] = await Membership.findOrCreate({
    where: { userId, groupId },
    defaults: { role }
  });
  if (!created) await m.update({ role });
  return m;
}

export async function listMembers(groupId) {
  return Membership.findAll({
    where: { groupId },
    include: [{ model: User, attributes: ["id", "username", "email", "fullName", "role"] }]
  });
}

export async function removeMember({ userId, groupId }) {
  const m = await Membership.findOne({ where: { userId, groupId } });
  if (!m) return false;
  await m.destroy();
  return true;
}

// Nuevas funciones para gestión de membresías
export async function joinGroup(userId, groupId) {
  // Verificar que el grupo existe
  const group = await Group.findByPk(groupId);
  if (!group) throw new Error("Grupo no encontrado");
  
  // Crear membresía como miembro por defecto
  const [membership, created] = await Membership.findOrCreate({
    where: { userId, groupId },
    defaults: { role: "member" }
  });
  
  if (!created) {
    throw new Error("Ya eres miembro de este grupo");
  }
  
  // Actualizar contador de miembros en el grupo
  await group.increment('members');
  
  return membership;
}

export async function leaveGroup(userId, groupId) {
  const membership = await Membership.findOne({ where: { userId, groupId } });
  if (!membership) {
    throw new Error("No eres miembro de este grupo");
  }
  
  // No permitir que el coordinador se retire
  if (membership.role === 'coordinator') {
    throw new Error("El coordinador no puede abandonar el grupo");
  }
  
  await membership.destroy();
  
  // Actualizar contador de miembros en el grupo
  const group = await Group.findByPk(groupId);
  if (group) {
    await group.decrement('members');
  }
  
  return true;
}

export async function getUserMemberships(userId) {
  return Membership.findAll({
    where: { userId },
    include: [{ 
      model: Group, 
      attributes: ["id", "name", "category", "description", "image", "categoryColor"] 
    }]
  });
}

export async function isMember(userId, groupId) {
  const membership = await Membership.findOne({ where: { userId, groupId } });
  return !!membership;
}

export async function isCoordinator(userId, groupId) {
  const membership = await Membership.findOne({ 
    where: { userId, groupId, role: 'coordinator' } 
  });
  return !!membership;
}
