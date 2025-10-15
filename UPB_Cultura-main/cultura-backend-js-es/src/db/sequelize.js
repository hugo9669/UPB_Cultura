// Conexión Sequelize a PostgreSQL
import { Sequelize } from "sequelize";
import { NODE_ENV, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } from "../config/env.js";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT),
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  logging: NODE_ENV === "development" ? console.log : false,
  define: {
    // Configuración para PostgreSQL
    underscored: true,
    timestamps: true,
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
