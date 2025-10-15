// Modelo de Comentarios
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Comment = sequelize.define("Comment", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
    field: "ID"
  },
  contenido: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  fechaComentario: { 
    type: DataTypes.DATE, 
    allowNull: false,
    field: "fecha_comentario"
  },
  idUsuario: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_usuario"
  },
  idEvento: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_evento"
  },
  idPublicacion: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_publicacion"
  }
}, {
  tableName: "Comentarios",
  timestamps: false
});



