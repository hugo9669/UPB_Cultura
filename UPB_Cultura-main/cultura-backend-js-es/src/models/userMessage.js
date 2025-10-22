import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const UserMessage = sequelize.define(
  "UserMessage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID"
    },
    idRemitente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Id_remitente",
      comment: "ID del líder cultural que envía el mensaje"
    },
    idDestinatario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Id_destinatario",
      comment: "ID del usuario que recibe el mensaje"
    },
    idGrupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Id_grupo",
      comment: "Grupo cultural al que pertenece el mensaje"
    },
    idEvento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "Id_evento",
      comment: "Evento relacionado (opcional)"
    },
    asunto: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "asunto"
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
    },
    fechaLectura: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "fecha_lectura"
    }
  },
  {
    tableName: "Mensajes_Usuarios",
    timestamps: false,
    underscored: false
  }
);


