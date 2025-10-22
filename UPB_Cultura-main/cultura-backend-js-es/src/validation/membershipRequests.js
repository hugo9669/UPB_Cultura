import Joi from "joi";

export const createMembershipRequestSchema = Joi.object({
  idGrupo: Joi.number().integer().positive().required(),
  motivacion: Joi.string().min(20).max(1000).required(),
  experiencia: Joi.string().min(10).max(1000).allow('', null).optional(),
});

export const updateMembershipRequestSchema = Joi.object({
  estado: Joi.string().valid('aprobada', 'rechazada').required(),
  mensajeRespuesta: Joi.string().min(10).max(500).allow('', null).optional(),
});


