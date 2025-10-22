// Modelo de Categorias
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Category = sequelize.define("Category", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
    field: "ID"
  },
  nombreCategoria: { 
    type: DataTypes.TEXT, 
    allowNull: false,
    field: "nombre_categoria"
  },
  descripcion: { 
    type: DataTypes.TEXT, 
    allowNull: true
  }
}, {
  tableName: "Categorias",
  timestamps: false
});



<<<<<<< HEAD





=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
