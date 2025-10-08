// Modelo de eventos culturales
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Event = sequelize.define("Event", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING(120), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  category: { type: DataTypes.STRING(60), allowNull: false },
  groupId: { type: DataTypes.UUID, allowNull: false },
  location: { type: DataTypes.STRING(160), allowNull: false },
  startAt: { type: DataTypes.DATE, allowNull: false },
  endAt: { type: DataTypes.DATE, allowNull: false },
  visibility: { type: DataTypes.ENUM("public", "members", "private"), defaultValue: "public" },
  ticketUrl: { type: DataTypes.STRING, allowNull: true },
  publishAt: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: "events"
});
