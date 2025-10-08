// Inicialización de la BD sin sync destructivo (respeta esquema existente)
import { sequelize } from "./sequelize.js";
import "./relations.js"; // registra asociaciones

export async function initDb() {
  await sequelize.authenticate();
  console.log("[DB] Conectado (sin sync)");
}
