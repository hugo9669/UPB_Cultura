import Joi from "joi";

// Schema basado en la estructura real de la BD
export const createEventSchema = Joi.object({
  // Campos de la BD
  titulo: Joi.string().min(2).max(255).required(),
  descripcion: Joi.string().allow(null, "").optional(),
  fechaEvento: Joi.date().min('now').required().messages({
    'date.min': 'La fecha del evento debe ser igual o posterior a la fecha actual',
    'date.base': 'Debe proporcionar una fecha válida'
  }),
  ubicacion: Joi.string().max(255).required(),
  idGrupo: Joi.number().integer().required(),
  enlaceBoleteria: Joi.string().uri().allow(null, "").optional(),
  urlImagen: Joi.string().max(500).required(),
  
  // Campos alternativos (inglés) para compatibilidad
  title: Joi.string().min(2).max(255),
  description: Joi.string().allow(null, ""),
  category: Joi.string().min(2).max(60),
  groupId: Joi.alternatives().try(Joi.string(), Joi.number().integer()),
  location: Joi.string().max(255),
  startAt: Joi.date(),
  endAt: Joi.date(),
  visibility: Joi.string().valid("public", "members", "private"),
  ticketUrl: Joi.string().uri().allow(null, ""),
  publishAt: Joi.date().allow(null),
  image: Joi.string().uri().allow(null, ""),
  categoryColor: Joi.string().max(20)
});

export const updateEventSchema = Joi.object({
  // Campos de la BD
  titulo: Joi.string().min(2).max(255),
  descripcion: Joi.string().allow(null, ""),
  fechaEvento: Joi.date().min('now').messages({
    'date.min': 'La fecha del evento debe ser igual o posterior a la fecha actual',
    'date.base': 'Debe proporcionar una fecha válida'
  }),
  ubicacion: Joi.string().max(255),
  idGrupo: Joi.number().integer(),
  enlaceBoleteria: Joi.string().uri().allow(null, ""),
  urlImagen: Joi.string().max(500),
  
  // Campos alternativos (inglés)
  title: Joi.string().min(2).max(255),
  description: Joi.string().allow(null, ""),
  category: Joi.string().min(2).max(60),
  groupId: Joi.alternatives().try(Joi.string(), Joi.number().integer()),
  location: Joi.string().max(255),
  startAt: Joi.date(),
  endAt: Joi.date(),
  visibility: Joi.string().valid("public", "members", "private"),
  ticketUrl: Joi.string().uri().allow(null, ""),
  publishAt: Joi.date().allow(null),
  image: Joi.string().uri().allow(null, ""),
  categoryColor: Joi.string().max(20)
}).min(1);
