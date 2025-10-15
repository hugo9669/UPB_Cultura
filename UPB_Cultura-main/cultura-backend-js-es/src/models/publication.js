// Modelo de Publicaciones
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Publication = sequelize.define("Publication", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
    field: "ID"
  },
  titulo: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  contenido: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  fechaPublicacion: { 
    type: DataTypes.DATE, 
    allowNull: false,
    field: "fecha_publicacion"
  },
  idGrupo: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_grupo"
  }
}, {
  tableName: "Publicaciones",
  timestamps: false
});



