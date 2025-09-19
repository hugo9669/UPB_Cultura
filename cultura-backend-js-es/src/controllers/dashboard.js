// Dashboard administrativo básico (ejemplo de KPIs simples)
import { Group, Membership, Event } from "../models/index.js";
import { Op } from "sequelize";

export async function summaryCtrl(_req, res, next) {
  try {
    const [groups, members, upcoming] = await Promise.all([
      Group.count(),
      Membership.count(),
      Event.count({ where: { startAt: { [Op.gte]: new Date() } } })
    ]);
    res.json({ totalGroups: groups, totalMembers: members, upcomingEvents: upcoming });
  } catch (err) { next(err); }
}
