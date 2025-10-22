// Modelo de Repertorios
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Repertorio = sequelize.define("Repertorio", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
    field: "ID"
  },
  nombreRepertorio: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    field: "nombre_repertorio"
  },
  descripcion: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  idGrupo: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: "Id_grupo"
  }
}, {
  tableName: "Repertorios",
  timestamps: false
});



<<<<<<< HEAD





=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
