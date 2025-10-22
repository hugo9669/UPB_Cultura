import Joi from "joi";

export const sendMessageSchema = Joi.object({
  idGrupo: Joi.number().integer().positive().required(),
  motivo: Joi.string().min(5).max(200).required(),
  mensaje: Joi.string().min(10).required()
});

