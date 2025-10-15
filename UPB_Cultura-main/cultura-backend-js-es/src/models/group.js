// Modelo de Grupos Culturales
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Group = sequelize.define("Group", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
    field: "ID"
  },
  nombreGrupo: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    field: "nombre_grupo"
  },
  descripcion: { 
    type: DataTypes.TEXT, 
    allowNull: true
  },
  idLider: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_lider"
  },
  idCategoria: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_categoria"
  },
  urlLogo: { 
    type: DataTypes.TEXT, 
    allowNull: true,
    field: "url_logo"
  }
}, {
  tableName: "Grupos_Culturales ",
  timestamps: false
});
