// Modelo de membresías (usuario pertenece a grupo con un rol)
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Membership = sequelize.define("Membership", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  groupId: { type: DataTypes.UUID, allowNull: false },
  role: { type: DataTypes.ENUM("coordinator", "leader", "member"), defaultValue: "member" }
}, {
  tableName: "memberships",
  indexes: [{ unique: true, fields: ["userId", "groupId"] }]
});
