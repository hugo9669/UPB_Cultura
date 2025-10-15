// Modelo de Usuarios
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const User = sequelize.define("User", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
    field: "ID"
  },
  nombre: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  correo: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    unique: true
  },
  contrasena: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  idRol: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_rol"
  }
}, {
  tableName: "Usuarios",
  timestamps: false
});
