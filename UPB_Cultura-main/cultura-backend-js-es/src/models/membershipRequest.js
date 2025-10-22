import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import { User } from "./user.js";
import { Group } from "./group.js";

export const MembershipRequest = sequelize.define(
  "MembershipRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID",
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Id_usuario",
      references: {
        model: User,
        key: "ID",
      },
    },
    idGrupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Id_grupo",
      references: {
        model: Group,
        key: "ID",
      },
    },
    motivacion: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "motivacion",
    },
    experiencia: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "experiencia",
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'pendiente',
      field: "estado",
      // Estados: 'pendiente', 'aprobada', 'rechazada'
    },
    fechaSolicitud: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "fecha_solicitud",
    },
    fechaRespuesta: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "fecha_respuesta",
    },
    mensajeRespuesta: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "mensaje_respuesta",
    },
  },
  {
    tableName: "Solicitudes_Membresia",
    timestamps: false,
    underscored: false,
  }
);


