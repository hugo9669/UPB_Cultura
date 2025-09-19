// Modelo de usuarios
// TODO: Ajustar tableName/campos para que coincidan con tu BD real si difieren.
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const User = sequelize.define("User", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  username: { type: DataTypes.STRING(60), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  fullName: { type: DataTypes.STRING(120), allowNull: true },
  passwordHash: { type: DataTypes.STRING, allowNull: true }, // null si el usuario es solo SSO
  role: { type: DataTypes.ENUM("admin", "coordinator", "leader", "member", "student"), defaultValue: "student" }
}, {
  tableName: "users"
});
