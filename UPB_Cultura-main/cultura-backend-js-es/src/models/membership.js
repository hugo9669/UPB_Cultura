// Modelo de Miembros de Grupo
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Membership = sequelize.define("Membership", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
    field: "ID"
  },
  idUsuario: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_usuario"
  },
  idGrupo: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_grupo"
  },
  fechaUnion: { 
    type: DataTypes.DATEONLY, 
    allowNull: false,
    field: "fecha_union"
  }
}, {
  tableName: "Miembros_Grupo",
  timestamps: false
});
