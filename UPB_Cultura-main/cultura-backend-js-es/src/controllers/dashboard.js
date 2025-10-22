import * as svc from "../services/dashboard.js";

export async function getStatsCtrl(req, res, next) {
  try {
    const stats = await svc.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
}
