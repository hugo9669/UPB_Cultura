import { Membership, User } from "../models/index.js";

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
