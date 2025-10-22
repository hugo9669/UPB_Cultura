import { Group, Category, User, Membership, Event, Message, UserMessage, MembershipRequest } from "../models/index.js";
import { Op } from "sequelize";
import { getRedis } from "../utils/redis.js";
import createError from "http-errors";

export async function createGroup(payload) {
  // Mapear campos del frontend al backend
  const createData = {};
  
  if (payload.name) createData.nombreGrupo = payload.name;
  if (payload.description) createData.descripcion = payload.description;
  if (payload.image || payload.logoUrl) createData.urlLogo = payload.image || payload.logoUrl;
  if (payload.leaderId) createData.idLider = payload.leaderId;
  
  // Validar que no exista un grupo con el mismo nombre
  if (payload.name) {
    const existingGroupByName = await Group.findOne({
      where: { nombreGrupo: payload.name }
    });
    
    if (existingGroupByName) {
      throw createError(
        400,
        `Ya existe un grupo cultural con el nombre "${payload.name}". Por favor, elige un nombre diferente.`
      );
    }
  }
  
  // Validar que el líder no esté asignado a otro grupo
  if (payload.leaderId) {
    const existingGroup = await Group.findOne({
      where: { idLider: payload.leaderId }
    });
    
    if (existingGroup) {
      const leaderInfo = await User.findByPk(payload.leaderId);
      throw createError(
        400,
        `El líder cultural "${leaderInfo?.nombre || 'seleccionado'}" ya está asignado al grupo "${existingGroup.nombreGrupo}". Un líder cultural solo puede estar a cargo de un grupo a la vez.`
      );
    }
  }
  
  // Convertir categoría de string a ID
  if (payload.category) {
    if (typeof payload.category === 'number') {
      createData.idCategoria = payload.category;
    } else if (typeof payload.category === 'string') {
      const category = await Category.findOne({
        where: { nombreCategoria: payload.category }
      });
      if (category) {
        createData.idCategoria = category.id;
      } else {
        throw createError(400, `Categoría "${payload.category}" no encontrada`);
      }
    }
  }
  
  console.log('📝 Creando grupo con datos:', createData);
  
  const group = await Group.create(createData);
  
  try {
    await getRedis().flushall(); // invalida caches simples
  } catch (error) {
    console.log('⚠️ No se pudo limpiar caché:', error.message);
  }
  
  return group;
}

export async function listGroups({ q, category, limit = 20, offset = 0 }) {
  const key = `groups:list:${q || ""}:${category || ""}:${limit}:${offset}`;
  
  try {
    const redis = getRedis();
    const cached = await redis.get(key);
    if (cached) {
      console.log('✅ Grupos obtenidos del cache');
      return JSON.parse(cached);
    }
  } catch (redisError) {
    console.log('⚠️ Redis no disponible, continuando sin caché:', redisError.message);
  }

  const where = {};
  if (q) where.nombreGrupo = { [Op.iLike]: `%${q}%` };
  if (category) where.idCategoria = category;

  const items = await Group.findAll({ 
    where, 
    limit, 
    offset, 
    order: [["nombreGrupo", "ASC"]],
    raw: true
  });
  
  // Agregar el nombre de la categoría, conteo de miembros y nombre del líder a cada grupo
  const itemsWithCategory = await Promise.all(
    items.map(async (item) => {
      // Obtener categoría
      const category = await Category.findByPk(item.idCategoria);
      
      // Contar miembros del grupo
      const memberCount = await Membership.count({
        where: { idGrupo: item.id }
      });
      
      // Obtener información del líder
      let leaderName = null;
      if (item.idLider) {
        const leader = await User.findByPk(item.idLider);
        if (leader) {
          leaderName = leader.nombre;
        }
      }
      
      return {
        ...item,
        category: category ? category.nombreCategoria : 'General',
        memberCount: memberCount,
        leaderName: leaderName
      };
    })
  );
  
  console.log('📊 Grupos obtenidos de la BD:', itemsWithCategory.length);
  if (itemsWithCategory.length > 0) {
    console.log('📋 Primer grupo:', itemsWithCategory[0]);
  }
  
  try {
    const redis = getRedis();
    await redis.setex(key, 60, JSON.stringify(itemsWithCategory));
  } catch (redisError) {
    console.log('⚠️ No se pudo guardar en caché:', redisError.message);
  }
  
  return itemsWithCategory;
}

export async function getGroup(id) {
  const g = await Group.findByPk(id);
  if (!g) return null;
  
  // Obtener el nombre de la categoría
  const category = await Category.findByPk(g.idCategoria);
  
  // Contar miembros del grupo
  const memberCount = await Membership.count({
    where: { idGrupo: id }
  });
  
  // Obtener información del líder
  let leaderName = null;
  if (g.idLider) {
    const leader = await User.findByPk(g.idLider);
    if (leader) {
      leaderName = leader.nombre;
    }
  }
  
  // Convertir a objeto plano y agregar información adicional
  const groupData = g.toJSON();
  if (category) {
    groupData.category = category.nombreCategoria;
  }
  groupData.memberCount = memberCount;
  groupData.leaderName = leaderName;
  
  return groupData;
}

export async function updateGroup(id, data, userRole = 'administrador') {
  const g = await Group.findByPk(id);
  if (!g) return null;
  
  // Mapear campos del frontend al backend
  const updateData = {};
  
  // Validación 1: Si se cambia el nombre, verificar que no exista otro grupo con ese nombre
  if (data.name !== undefined && data.name !== g.nombreGrupo) {
    const existingGroupByName = await Group.findOne({
      where: { 
        nombreGrupo: data.name,
        id: { [Op.ne]: id } // Excluir el grupo actual
      }
    });
    
    if (existingGroupByName) {
      throw createError(
        400,
        `Ya existe un grupo cultural con el nombre "${data.name}". Por favor, elige un nombre diferente.`
      );
    }
    updateData.nombreGrupo = data.name;
  }
  
  if (data.description !== undefined) updateData.descripcion = data.description;
  if (data.image !== undefined) updateData.urlLogo = data.image;
  if (data.logoUrl !== undefined) updateData.urlLogo = data.logoUrl;
  
  // Validación 2: Solo administradores pueden cambiar la categoría
  if (data.category || data.idCategoria !== undefined) {
    if (userRole !== 'administrador') {
      throw createError(
        403,
        'Solo los administradores pueden cambiar la categoría de un grupo cultural.'
      );
    }
    
    // Convertir categoría de string a ID
    if (data.category) {
      if (typeof data.category === 'number') {
        updateData.idCategoria = data.category;
      } else if (typeof data.category === 'string') {
        // Buscar la categoría por nombre
        const category = await Category.findOne({
          where: { nombreCategoria: data.category }
        });
        if (category) {
          updateData.idCategoria = category.id;
          console.log(`✅ Categoría "${data.category}" convertida a ID: ${category.id}`);
        } else {
          console.log(`⚠️ Categoría "${data.category}" no encontrada en BD`);
        }
      }
    }
    if (data.idCategoria !== undefined) updateData.idCategoria = data.idCategoria;
  }
  
  console.log('📝 Actualizando grupo ID', id, 'con datos:', updateData);
  
  await g.update(updateData);
  
  // Recargar el grupo para obtener los datos actualizados
  await g.reload();
  
  // Obtener el nombre de la categoría
  const category = await Category.findByPk(g.idCategoria);
  
  // Contar miembros del grupo
  const memberCount = await Membership.count({
    where: { idGrupo: id }
  });
  
  // Obtener información del líder
  let leaderName = null;
  if (g.idLider) {
    const leader = await User.findByPk(g.idLider);
    if (leader) {
      leaderName = leader.nombre;
    }
  }
  
  // Convertir a objeto plano y agregar información adicional
  const groupData = g.toJSON();
  if (category) {
    groupData.category = category.nombreCategoria;
    console.log(`✅ Categoría agregada: ${category.nombreCategoria}`);
  }
  groupData.memberCount = memberCount;
  groupData.leaderName = leaderName;
  
  console.log('✅ Grupo actualizado:', groupData);
  
  try {
    await getRedis().flushall();
  } catch (error) {
    console.log('⚠️ No se pudo limpiar caché:', error.message);
  }
  
  return groupData;
}

export async function deleteGroup(id) {
  console.log('🗑️ Intentando eliminar grupo ID:', id);
  
  const g = await Group.findByPk(id);
  if (!g) {
    console.log('❌ Grupo no encontrado');
    return false;
  }
  
  console.log('✅ Grupo encontrado, procediendo a eliminar...');
  
  // Eliminar todas las relaciones primero
  try {
    // Eliminar solicitudes de membresía pendientes
    await MembershipRequest.destroy({ where: { idGrupo: id } });
    console.log('✅ Solicitudes de membresía eliminadas');
    
    // Eliminar membresías
    await Membership.destroy({ where: { idGrupo: id } });
    console.log('✅ Membresías eliminadas');
    
    // Eliminar mensajes de usuarios relacionados al grupo
    await UserMessage.destroy({ where: { idGrupo: id } });
    console.log('✅ Mensajes de usuarios eliminados');
    
    // Eliminar mensajes administrativos relacionados al grupo
    await Message.destroy({ where: { idGrupo: id } });
    console.log('✅ Mensajes administrativos eliminados');
    
    // Eliminar eventos del grupo
    await Event.destroy({ where: { idGrupo: id } });
    console.log('✅ Eventos eliminados');
    
    // Ahora eliminar el grupo
    await g.destroy();
    console.log('✅ Grupo eliminado exitosamente');
    
    // Limpiar caché
    try {
      await getRedis().flushall();
    } catch (error) {
      console.log('⚠️ No se pudo limpiar caché:', error.message);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error al eliminar grupo:', error);
    throw error;
  }
}
