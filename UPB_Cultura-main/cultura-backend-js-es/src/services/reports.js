import { Group, User, Event, Message, Membership, Category, Role } from "../models/index.js";
import { Op } from "sequelize";
import { sequelize } from "../db/sequelize.js";

/**
 * Reporte de eventos con filtros
 */
export async function getEventsReport({ startDate, endDate, categoryId, groupId } = {}) {
  const where = {};
  
  // Filtrar por rango de fechas
  if (startDate && endDate) {
    where.fechaEvento = {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    };
  } else if (startDate) {
    where.fechaEvento = {
      [Op.gte]: new Date(startDate)
    };
  } else if (endDate) {
    where.fechaEvento = {
      [Op.lte]: new Date(endDate)
    };
  }
  
  // Filtrar por grupo
  if (groupId) {
    where.idGrupo = groupId;
  }
  
  const events = await Event.findAll({
    where,
    include: [
      {
        model: Group,
        as: 'grupo',
        include: [
          {
            model: Category,
            as: 'categoria',
            where: categoryId ? { id: categoryId } : undefined
          }
        ]
      }
    ],
    order: [['fechaEvento', 'ASC']]
  });
  
  const reportData = events.map(event => ({
    id: event.id,
    titulo: event.titulo,
    descripcion: event.descripcion,
    fechaEvento: event.fechaEvento,
    ubicacion: event.ubicacion,
    grupoNombre: event.grupo?.nombreGrupo || 'Sin grupo',
    categoria: event.grupo?.categoria?.nombreCategoria || 'Sin categoría',
    enlaceBoleteria: event.enlaceBoleteria
  }));
  
  return {
    total: reportData.length,
    eventos: reportData
  };
}

/**
 * Reporte de grupos culturales con estadísticas y detalles completos
 */
export async function getGroupsReport() {
  const groups = await Group.findAll({
    include: [
      {
        model: Category,
        as: 'categoria'
      },
      {
        model: User,
        as: 'lider'
      }
    ],
    order: [['nombreGrupo', 'ASC']]
  });
  
  const reportData = await Promise.all(groups.map(async (group) => {
    // Obtener lista completa de miembros
    const members = await Membership.findAll({
      where: { idGrupo: group.id },
      include: [
        {
          model: User,
          as: 'usuario',
          attributes: ['id', 'nombre', 'correo']
        }
      ],
      order: [['fechaUnion', 'DESC']]
    });
    
    const membersList = members.map(m => ({
      id: m.usuario.id,
      nombre: m.usuario.nombre,
      correo: m.usuario.correo,
      fechaUnion: m.fechaUnion
    }));
    
    // Obtener lista completa de eventos
    const events = await Event.findAll({
      where: { idGrupo: group.id },
      attributes: ['id', 'titulo', 'descripcion', 'fechaEvento', 'ubicacion'],
      order: [['fechaEvento', 'DESC']]
    });
    
    const eventsList = events.map(e => ({
      id: e.id,
      titulo: e.titulo,
      descripcion: e.descripcion,
      fechaEvento: e.fechaEvento,
      ubicacion: e.ubicacion,
      esFuturo: new Date(e.fechaEvento) >= new Date()
    }));
    
    // Contar eventos futuros
    const upcomingEventsCount = eventsList.filter(e => e.esFuturo).length;
    
    // Obtener lista completa de mensajes
    const messages = await Message.findAll({
      where: { idGrupo: group.id },
      order: [['fechaEnvio', 'DESC']]
    });
    
    const messagesList = messages.map(m => ({
      id: m.id,
      asunto: m.motivo, // El campo "motivo" actúa como asunto
      mensaje: m.mensaje,
      remitente: m.nombreRemitente || 'Desconocido',
      fechaEnvio: m.fechaEnvio,
      leido: m.leido
    }));
    
    return {
      id: group.id,
      nombre: group.nombreGrupo,
      descripcion: group.descripcion,
      categoria: group.categoria?.nombreCategoria || 'Sin categoría',
      lider: group.lider?.nombre || 'Sin líder',
      correoLider: group.lider?.correo || '',
      // Contadores
      miembros: membersList.length,
      eventosTotales: eventsList.length,
      eventosFuturos: upcomingEventsCount,
      mensajesRecibidos: messagesList.length,
      // Listas detalladas
      detallesMiembros: membersList,
      detallesEventos: eventsList,
      detallesMensajes: messagesList
    };
  }));
  
  return {
    total: reportData.length,
    grupos: reportData
  };
}

/**
 * Reporte de usuarios por rol
 */
export async function getUsersReport() {
  const users = await User.findAll({
    include: [
      {
        model: Role,
        as: 'rol'
      }
    ],
    order: [['nombre', 'ASC']]
  });
  
  const reportData = users.map(user => ({
    id: user.id,
    nombre: user.nombre,
    correo: user.correo,
    rol: user.rol?.nombreRol || 'Sin rol'
  }));
  
  // Estadísticas por rol
  const roleStats = await sequelize.query(`
    SELECT 
      r."Nombre_rol" as rol,
      COUNT(u."ID") as cantidad
    FROM "Usuarios" u
    LEFT JOIN "Roles" r ON u."Id_rol" = r."ID"
    GROUP BY r."Nombre_rol"
    ORDER BY cantidad DESC
  `, { type: sequelize.QueryTypes.SELECT });
  
  return {
    total: reportData.length,
    usuarios: reportData,
    estadisticasPorRol: roleStats
  };
}

/**
 * Reporte de mensajería
 */
export async function getMessagesReport({ groupId, readStatus } = {}) {
  const where = {};
  
  if (groupId) {
    where.idGrupo = groupId;
  }
  
  if (readStatus !== undefined) {
    where.leido = readStatus;
  }
  
  const messages = await Message.findAll({
    where,
    include: [
      {
        model: Group,
        as: 'grupo',
        include: [
          {
            model: User,
            as: 'lider'
          }
        ]
      }
    ],
    order: [['fechaEnvio', 'DESC']]
  });
  
  const reportData = messages.map(msg => ({
    id: msg.id,
    grupoNombre: msg.grupo?.nombreGrupo || 'Sin grupo',
    liderNombre: msg.grupo?.lider?.nombre || 'Sin líder',
    remitente: msg.nombreRemitente,
    correoRemitente: msg.correoRemitente,
    motivo: msg.motivo,
    fechaEnvio: msg.fechaEnvio,
    leido: msg.leido
  }));
  
  // Estadísticas de mensajes
  const stats = {
    total: messages.length,
    leidos: messages.filter(m => m.leido).length,
    noLeidos: messages.filter(m => !m.leido).length
  };
  
  return {
    ...stats,
    mensajes: reportData
  };
}

/**
 * Reporte general del sistema
 */
export async function getGeneralReport() {
  // Contar totales
  const totalGroups = await Group.count();
  const totalUsers = await User.count();
  const totalEvents = await Event.count();
  const totalMessages = await Message.count();
  
  // Eventos futuros
  const upcomingEvents = await Event.count({
    where: {
      fechaEvento: {
        [Op.gte]: new Date()
      }
    }
  });
  
  // Eventos pasados
  const pastEvents = await Event.count({
    where: {
      fechaEvento: {
        [Op.lt]: new Date()
      }
    }
  });
  
  // Usuarios por rol
  const usersByRole = await sequelize.query(`
    SELECT 
      r."Nombre_rol" as rol,
      COUNT(u."ID") as cantidad
    FROM "Usuarios" u
    LEFT JOIN "Roles" r ON u."Id_rol" = r."ID"
    GROUP BY r."Nombre_rol"
  `, { type: sequelize.QueryTypes.SELECT });
  
  // Grupos por categoría
  const groupsByCategory = await sequelize.query(`
    SELECT 
      c."nombre_categoria" as categoria,
      COUNT(g."ID") as cantidad
    FROM "Grupos_Culturales " g
    LEFT JOIN "Categorias" c ON g."Id_categoria" = c."ID"
    GROUP BY c."nombre_categoria"
  `, { type: sequelize.QueryTypes.SELECT });
  
  // Total de miembros en todos los grupos
  const totalMemberships = await Membership.count();
  
  // Mensajes no leídos
  const unreadMessages = await Message.count({
    where: { leido: false }
  });
  
  return {
    resumenGeneral: {
      totalGrupos: totalGroups,
      totalUsuarios: totalUsers,
      totalEventos: totalEvents,
      eventosFuturos: upcomingEvents,
      eventosPasados: pastEvents,
      totalMensajes: totalMessages,
      mensajesNoLeidos: unreadMessages,
      totalMiembros: totalMemberships
    },
    usuariosPorRol: usersByRole,
    gruposPorCategoria: groupsByCategory
  };
}

