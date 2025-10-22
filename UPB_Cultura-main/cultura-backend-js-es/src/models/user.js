// Modelo de Usuarios
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const User = sequelize.define("User", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
    field: "ID",
    allowNull: false
  },
  nombre: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    field: "nombre"
  },
  correo: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    unique: true,
    field: "correo"
  },
  contrasena: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    field: "contrasena"
  },
  idRol: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_rol"
  }
}, {
  tableName: "Usuarios",
  timestamps: false,
  underscored: false
});
