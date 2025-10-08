// Modelo de media (imágenes/archivos) asociado a grupos o eventos
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Media = sequelize.define("Media", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  kind: { type: DataTypes.ENUM("image", "file"), defaultValue: "image" },
  url: { type: DataTypes.STRING, allowNull: false }, // ruta pública o absoluta
  caption: { type: DataTypes.STRING(200), allowNull: true },
  groupId: { type: DataTypes.UUID, allowNull: true },
  eventId: { type: DataTypes.UUID, allowNull: true }
}, {
  tableName: "media"
});
