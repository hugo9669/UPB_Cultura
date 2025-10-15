// Modelo de Roles
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Role = sequelize.define("Role", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
    field: "ID"
  },
  nombreRol: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    field: "Nombre_rol"
  }
}, {
  tableName: "Roles",
  timestamps: false
});



