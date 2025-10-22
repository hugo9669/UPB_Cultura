import * as svc from "../services/reports.js";

/**
 * Obtener reporte de eventos
 */
export async function getEventsReportCtrl(req, res, next) {
  try {
    const { startDate, endDate, categoryId, groupId } = req.query;
    
    const report = await svc.getEventsReport({
      startDate,
      endDate,
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      groupId: groupId ? parseInt(groupId) : undefined
    });
    
    res.json(report);
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener reporte de grupos culturales
 */
export async function getGroupsReportCtrl(_req, res, next) {
  try {
    const report = await svc.getGroupsReport();
    res.json(report);
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener reporte de usuarios
 */
export async function getUsersReportCtrl(_req, res, next) {
  try {
    const report = await svc.getUsersReport();
    res.json(report);
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener reporte de mensajería
 */
export async function getMessagesReportCtrl(req, res, next) {
  try {
    const { groupId, readStatus } = req.query;
    
    let parsedReadStatus;
    if (readStatus === 'true') parsedReadStatus = true;
    else if (readStatus === 'false') parsedReadStatus = false;
    else parsedReadStatus = undefined;
    
    const report = await svc.getMessagesReport({
      groupId: groupId ? parseInt(groupId) : undefined,
      readStatus: parsedReadStatus
    });
    
    res.json(report);
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener reporte general del sistema
 */
export async function getGeneralReportCtrl(_req, res, next) {
  try {
    const report = await svc.getGeneralReport();
    res.json(report);
  } catch (err) {
    next(err);
  }
}


