// Modelo de grupos culturales
// TODO: Mapea a tu tabla real (tableName y nombres de columnas si usan snake_case).
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Group = sequelize.define("Group", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  category: { type: DataTypes.STRING(60), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  logoUrl: { type: DataTypes.STRING, allowNull: true },
  ownerId: { type: DataTypes.UUID, allowNull: true }
}, {
  tableName: "groups"
});
