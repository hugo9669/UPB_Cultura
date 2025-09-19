import { listGroups } from "../services/groups.js";
import { listEvents } from "../services/events.js";

export async function globalSearchCtrl(req, res, next) {
  try {
    const { q, limit, offset } = req.query;
    const [groups, events] = await Promise.all([
      listGroups({ q, limit: Number(limit)||10, offset: Number(offset)||0 }),
      listEvents({ q, limit: Number(limit)||10, offset: Number(offset)||0 })
    ]);
    res.json({ groups, events });
  } catch (err) { next(err); }
}
