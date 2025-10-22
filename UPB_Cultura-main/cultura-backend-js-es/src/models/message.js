import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID"
    },
    idGrupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Id_grupo"
    },
    nombreRemitente: {
      type: DataTypes.STRING(120),
      allowNull: false,
      field: "nombre_remitente"
    },
    correoRemitente: {
      type: DataTypes.STRING(120),
      allowNull: false,
      field: "correo_remitente"
    },
    motivo: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "motivo"
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "mensaje"
    },
    leido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "leido"
    },
    fechaEnvio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "fecha_envio"
    }
  },
  {
    tableName: "Mensajes",
    timestamps: false,
    underscored: false
  }
);

