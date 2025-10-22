import Joi from "joi";

export const sendUserMessageSchema = Joi.object({
  idGrupo: Joi.number().integer().positive().required(),
  destinatarios: Joi.array()
    .items(Joi.number().integer().positive())
    .min(1)
    .required()
    .messages({
      'array.min': 'Debe seleccionar al menos un destinatario',
      'any.required': 'Los destinatarios son obligatorios'
    }),
  asunto: Joi.string().min(5).max(200).required().messages({
    'string.min': 'El asunto debe tener al menos 5 caracteres',
    'string.max': 'El asunto no puede exceder 200 caracteres',
    'any.required': 'El asunto es obligatorio'
  }),
  mensaje: Joi.string().min(10).required().messages({
    'string.min': 'El mensaje debe tener al menos 10 caracteres',
    'any.required': 'El mensaje es obligatorio'
  }),
  idEvento: Joi.number().integer().positive().allow(null).optional()
});

export const markAsReadSchema = Joi.object({
  leido: Joi.boolean().required()
});


