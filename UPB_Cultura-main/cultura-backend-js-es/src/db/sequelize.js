// Conexión Sequelize a PostgreSQL (no hace sync de modelos).
import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, NODE_ENV } from "../config/env.js";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  logging: NODE_ENV === "development" ? false : false,
  define: {
    // TODO: Configura según tu esquema real si usas snake_case y/o no manejas timestamps.
    // underscored: true,
    // timestamps: false,
    // freezeTableName: true
  }
});
