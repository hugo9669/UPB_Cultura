import { Event, Group, Category } from "../models/index.js";
import { Op } from "sequelize";
import { getRedis, isRedisAvailable } from "../utils/redis.js";

export async function createEvent(payload) {
  console.log('📝 Creando evento con payload:', payload);
  
  // Validar que no exista un evento en la misma fecha, hora y ubicación
  const fechaEvento = new Date(payload.fechaEvento);
  
  // Obtener fecha sin hora para comparación de día
  const fechaSoloDia = new Date(fechaEvento);
  fechaSoloDia.setHours(0, 0, 0, 0);
  
  const fechaInicio = new Date(fechaSoloDia);
  const fechaFin = new Date(fechaSoloDia);
  fechaFin.setHours(23, 59, 59, 999);
  
  console.log('🔍 Buscando conflictos:', {
    ubicacion: payload.ubicacion,
    fechaEvento: fechaEvento.toISOString(),
    rangoInicio: fechaInicio.toISOString(),
    rangoFin: fechaFin.toISOString()
  });
  
  // Buscar eventos en la misma ubicación y mismo día
  const eventosEnMismoLugar = await Event.findAll({
    where: {
      ubicacion: payload.ubicacion,
      fechaEvento: {
        [Op.between]: [fechaInicio, fechaFin]
      }
    }
  });
  
  console.log(`📊 Eventos encontrados en mismo lugar y día: ${eventosEnMismoLugar.length}`);
  
  if (eventosEnMismoLugar.length > 0) {
    // Solo validar si hay eventos en el mismo día
    const horaEvento = fechaEvento.getHours() * 60 + fechaEvento.getMinutes();
    
    for (const evento of eventosEnMismoLugar) {
      const fechaEventoExistente = new Date(evento.fechaEvento);
      const horaEventoExistente = fechaEventoExistente.getHours() * 60 + fechaEventoExistente.getMinutes();
      const diferencia = Math.abs(horaEvento - horaEventoExistente);
      
      console.log('⏰ Comparando horas:', {
        eventoNuevo: `${Math.floor(horaEvento / 60)}:${(horaEvento % 60).toString().padStart(2, '0')}`,
        eventoExistente: `${Math.floor(horaEventoExistente / 60)}:${(horaEventoExistente % 60).toString().padStart(2, '0')}`,
        diferenciaMinutos: diferencia
      });
      
      // Si la diferencia es menor a 60 minutos, hay conflicto
      if (diferencia < 60) {
        const error = new Error('Ya existe un evento programado en la misma ubicación a una hora cercana. Debe haber al menos 1 hora de diferencia entre eventos en el mismo lugar.');
        error.status = 409;
        throw error;
      }
    }
  }
  
  const e = await Event.create(payload);
<<<<<<< HEAD
  
  console.log('✅ Evento creado:', {
    id: e.id,
    titulo: e.titulo,
    idGrupo: e.idGrupo
  });
  
  if (isRedisAvailable()) {
    try {
      await getRedis().flushall();
      console.log('✅ Cache limpiado');
    } catch (error) {
      console.log('⚠️ No se pudo limpiar caché');
    }
  }
  
  // Convertir a objeto plano para evitar problemas con Sequelize
  return e.toJSON();
=======
  if (isRedisAvailable()) {
    try {
      await getRedis().flushall();
    } catch (error) {
      console.log('[Redis] Error al limpiar cache:', error.message);
    }
  }
  return e;
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
}

export async function listEvents({ q, groupId, category, dateFrom, dateTo, upcoming, limit = 20, offset = 0 }) {
  // Intentar usar cache de Redis si está disponible
  if (isRedisAvailable()) {
    try {
      const key = `events:list:${q||""}:${groupId||""}:${category||""}:${dateFrom||""}:${dateTo||""}:${upcoming||""}:${limit}:${offset}`;
      const redis = getRedis();
      const cached = await redis.get(key);
<<<<<<< HEAD
      if (cached) {
        console.log('✅ Eventos obtenidos del cache');
        return JSON.parse(cached);
      }
    } catch (error) {
      console.log('⚠️ Redis no disponible, continuando sin caché');
=======
      if (cached) return JSON.parse(cached);
    } catch (error) {
      console.log('[Redis] Error al obtener cache:', error.message);
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
    }
  }

  const where = {};
  if (q) where.titulo = { [Op.iLike]: `%${q}%` };
<<<<<<< HEAD
  if (groupId) where.idGrupo = parseInt(groupId);
=======
  if (groupId) where.idGrupo = groupId;
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  if (category) where.category = category;
  if (dateFrom || dateTo) where.fechaEvento = { ...(where.fechaEvento || {}) };
  if (dateFrom) where.fechaEvento[Op.gte] = new Date(dateFrom);
  if (dateTo) where.fechaEvento[Op.lte] = new Date(dateTo);
  if (upcoming) where.fechaEvento = { ...(where.fechaEvento||{}), [Op.gte]: new Date() };

<<<<<<< HEAD
  console.log('📊 Buscando eventos con filtros:', where);

  const items = await Event.findAll({ 
    where, 
    limit, 
    offset, 
    order: [["fechaEvento", "ASC"]],
    raw: false  // Cambiar a false para poder hacer include
  });
  
  console.log(`✅ Eventos encontrados: ${items.length}`);
  
  // Agregar información de categoría y grupo
  const itemsWithCategory = await Promise.all(
    items.map(async (item) => {
      const group = await Group.findByPk(item.idGrupo);
      let categoryName = null;
      let groupName = null;
      
      if (group) {
        groupName = group.nombreGrupo;
        
        if (group.idCategoria) {
          const category = await Category.findByPk(group.idCategoria);
          if (category) {
            categoryName = category.nombreCategoria;
          }
        }
      }
      
      // Convertir a objeto plano y agregar categoría y grupo
      const itemJSON = item.toJSON();
      itemJSON.category = categoryName;
      itemJSON.groupName = groupName;
      
      return itemJSON;
    })
  );
=======
  const items = await Event.findAll({ where, limit, offset, order: [["fechaEvento", "ASC"]] });
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  
  // Intentar guardar en cache si Redis está disponible
  if (isRedisAvailable()) {
    try {
      const key = `events:list:${q||""}:${groupId||""}:${category||""}:${dateFrom||""}:${dateTo||""}:${upcoming||""}:${limit}:${offset}`;
<<<<<<< HEAD
      await getRedis().setex(key, 60, JSON.stringify(itemsWithCategory));
    } catch (error) {
      console.log('⚠️ No se pudo guardar en caché');
    }
  }
  
  return itemsWithCategory;
=======
      await getRedis().setex(key, 60, JSON.stringify(items));
    } catch (error) {
      console.log('[Redis] Error al guardar cache:', error.message);
    }
  }
  
  return items;
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
}

export async function getEvent(id) {
  const event = await Event.findByPk(id);
  if (!event) return null;
  
  // Agregar información de categoría y grupo
  const group = await Group.findByPk(event.idGrupo);
  let categoryName = null;
  let groupName = null;
  
  if (group) {
    groupName = group.nombreGrupo;
    
    if (group.idCategoria) {
      const category = await Category.findByPk(group.idCategoria);
      if (category) {
        categoryName = category.nombreCategoria;
      }
    }
  }
  
  // Convertir a objeto plano y agregar categoría y grupo
  const eventJSON = event.toJSON();
  eventJSON.category = categoryName;
  eventJSON.groupName = groupName;
  
  return eventJSON;
}

export async function updateEvent(id, data) {
  const e = await Event.findByPk(id);
  if (!e) return null;
  if (data.endAt && data.startAt && new Date(data.endAt) < new Date(data.startAt)) {
    throw new Error("endAt no puede ser anterior a startAt");
  }
  
  console.log('📝 Actualizando evento ID:', id, 'con data:', data);
  
  // Validar que no exista un evento en la misma fecha, hora y ubicación (excluyendo el evento actual)
  if (data.fechaEvento || data.ubicacion) {
    const fechaEvento = data.fechaEvento ? new Date(data.fechaEvento) : new Date(e.fechaEvento);
    const ubicacion = data.ubicacion || e.ubicacion;
    
    // Obtener fecha sin hora para comparación de día
    const fechaSoloDia = new Date(fechaEvento);
    fechaSoloDia.setHours(0, 0, 0, 0);
    
    const fechaInicio = new Date(fechaSoloDia);
    const fechaFin = new Date(fechaSoloDia);
    fechaFin.setHours(23, 59, 59, 999);
    
    console.log('🔍 Buscando conflictos para update:', {
      eventoId: id,
      ubicacion: ubicacion,
      fechaEvento: fechaEvento.toISOString(),
      rangoInicio: fechaInicio.toISOString(),
      rangoFin: fechaFin.toISOString()
    });
    
    // Buscar eventos en la misma ubicación y mismo día (excluyendo el evento actual)
    const eventosEnMismoLugar = await Event.findAll({
      where: {
        id: { [Op.ne]: id },
        ubicacion: ubicacion,
        fechaEvento: {
          [Op.between]: [fechaInicio, fechaFin]
        }
      }
    });
    
    console.log(`📊 Eventos encontrados en mismo lugar y día: ${eventosEnMismoLugar.length}`);
    
    if (eventosEnMismoLugar.length > 0) {
      // Solo validar si hay eventos en el mismo día
      const horaEvento = fechaEvento.getHours() * 60 + fechaEvento.getMinutes();
      
      for (const evento of eventosEnMismoLugar) {
        const fechaEventoExistente = new Date(evento.fechaEvento);
        const horaEventoExistente = fechaEventoExistente.getHours() * 60 + fechaEventoExistente.getMinutes();
        const diferencia = Math.abs(horaEvento - horaEventoExistente);
        
        console.log('⏰ Comparando horas:', {
          eventoNuevo: `${Math.floor(horaEvento / 60)}:${(horaEvento % 60).toString().padStart(2, '0')}`,
          eventoExistente: `${Math.floor(horaEventoExistente / 60)}:${(horaEventoExistente % 60).toString().padStart(2, '0')}`,
          eventoExistenteId: evento.id,
          eventoExistenteTitulo: evento.titulo,
          eventoExistenteFecha: fechaEventoExistente.toISOString(),
          diferenciaMinutos: diferencia
        });
        
        // Si la diferencia es menor a 60 minutos, hay conflicto
        if (diferencia < 60) {
          const error = new Error('Ya existe un evento programado en la misma ubicación a una hora cercana. Debe haber al menos 1 hora de diferencia entre eventos en el mismo lugar.');
          error.status = 409;
          throw error;
        }
      }
    }
  }
  
  await e.update(data);
  if (isRedisAvailable()) {
    try {
      await getRedis().flushall();
    } catch (error) {
      console.log('[Redis] Error al limpiar cache:', error.message);
    }
  }
  return e;
}

export async function deleteEvent(id) {
  const e = await Event.findByPk(id);
  if (!e) return false;
  await e.destroy();
  if (isRedisAvailable()) {
    try {
      await getRedis().flushall();
    } catch (error) {
      console.log('[Redis] Error al limpiar cache:', error.message);
    }
  }
  return true;
}
