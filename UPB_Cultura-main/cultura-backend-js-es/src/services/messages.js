import { Message, Group } from "../models/index.js";

export async function sendMessage({ idGrupo, nombreRemitente, correoRemitente, motivo, mensaje }) {
  // Verificar que el grupo existe
  const group = await Group.findByPk(idGrupo);
  if (!group) {
    throw new Error("Grupo no encontrado");
  }
  
  // Crear el mensaje
  const newMessage = await Message.create({
    idGrupo,
    nombreRemitente,
    correoRemitente,
    motivo,
    mensaje,
    leido: false,
    fechaEnvio: new Date()
  });
  
  return {
    id: newMessage.id,
    idGrupo: newMessage.idGrupo,
    nombreRemitente: newMessage.nombreRemitente,
    correoRemitente: newMessage.correoRemitente,
    motivo: newMessage.motivo,
    mensaje: newMessage.mensaje,
    leido: newMessage.leido,
    fechaEnvio: newMessage.fechaEnvio
  };
}

export async function getMessagesByGroup(groupId) {
  const messages = await Message.findAll({
    where: { idGrupo: groupId },
    order: [['fechaEnvio', 'DESC']]
  });
  
  return messages.map(m => ({
    id: m.id,
    idGrupo: m.idGrupo,
    nombreRemitente: m.nombreRemitente,
    correoRemitente: m.correoRemitente,
    motivo: m.motivo,
    mensaje: m.mensaje,
    leido: m.leido,
    fechaEnvio: m.fechaEnvio
  }));
}

export async function markAsRead(messageId) {
  const message = await Message.findByPk(messageId);
  if (!message) {
    throw new Error("Mensaje no encontrado");
  }
  
  await message.update({ leido: true });
  
  return {
    id: message.id,
    leido: message.leido
  };
}

export async function getUnreadCount(groupId) {
  const count = await Message.count({
    where: { 
      idGrupo: groupId,
      leido: false 
    }
  });
  
  return count;
}

