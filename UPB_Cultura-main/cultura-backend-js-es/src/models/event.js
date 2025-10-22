// Modelo de Eventos
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Event = sequelize.define("Event", {
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
  descripcion: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    field: "descripcion "
  },
  fechaEvento: { 
    type: DataTypes.DATE, 
    allowNull: false,
    field: "fecha_evento"
  },
  ubicacion: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  idGrupo: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_grupo"
  },
  enlaceBoleteria: { 
    type: DataTypes.TEXT, 
    allowNull: true,
    field: "enlaca_boleteria"
  },
  urlImagen: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    field: "url_imagen"
  }
}, {
  tableName: "Eventos",
  timestamps: false
});
