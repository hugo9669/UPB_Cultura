// Modelo de anuncios internos por grupo
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Announcement = sequelize.define("Announcement", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  groupId: { type: DataTypes.UUID, allowNull: false },
  authorId: { type: DataTypes.UUID, allowNull: false },
  title: { type: DataTypes.STRING(150), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false }
}, {
  tableName: "announcements"
});
