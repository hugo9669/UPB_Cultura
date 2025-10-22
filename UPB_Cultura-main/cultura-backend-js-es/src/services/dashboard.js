import { User, Group, Event } from "../models/index.js";
import { Op } from "sequelize";

/**
 * Obtiene estadísticas generales del sistema
 */
export async function getStats() {
  // Contar total de grupos culturales
  const totalGroups = await Group.count();
  
  // Contar usuarios activos (todos los usuarios registrados)
  const activeUsers = await User.count();
  
  // Contar eventos programados (eventos con fecha mayor o igual a hoy)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Establecer a inicio del día
  
  const scheduledEvents = await Event.count({
    where: {
      fechaEvento: {
        [Op.gte]: today
      }
    }
  });
  
  return {
    totalGroups,
    activeUsers,
    scheduledEvents
  };
}


