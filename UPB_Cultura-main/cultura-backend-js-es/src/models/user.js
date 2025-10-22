// Modelo de Usuarios
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const User = sequelize.define("User", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
<<<<<<< HEAD
    field: "ID",
    allowNull: false
  },
  nombre: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    field: "nombre"
=======
    field: "ID"
  },
  nombre: { 
    type: DataTypes.TEXT, 
    allowNull: false
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  },
  correo: { 
    type: DataTypes.TEXT, 
    allowNull: false,
<<<<<<< HEAD
    unique: true,
    field: "correo"
  },
  contrasena: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    field: "contrasena"
=======
    unique: true
  },
  contrasena: { 
    type: DataTypes.TEXT, 
    allowNull: false
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  },
  idRol: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_rol"
  }
}, {
  tableName: "Usuarios",
<<<<<<< HEAD
  timestamps: false,
  underscored: false
=======
  timestamps: false
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
});
