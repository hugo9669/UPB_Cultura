import Joi from "joi";

// Schema basado en la estructura real de la BD
export const createEventSchema = Joi.object({
<<<<<<< HEAD
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
=======
  title: Joi.string().min(2).max(120).required(),
  description: Joi.string().allow(null, "").optional(),
  category: Joi.string().min(2).max(60).required(),
  groupId: Joi.string().uuid().required(),
  location: Joi.string().max(160).required(),
  startAt: Joi.date().required(),
  endAt: Joi.date().min(Joi.ref("startAt")).required(),
  visibility: Joi.string().valid("public", "members", "private").default("public"),
  ticketUrl: Joi.string().uri().allow(null, "").optional(),
  publishAt: Joi.date().allow(null).optional(),
  // Campos adicionales para compatibilidad con frontend
  image: Joi.string().uri().allow(null, "").optional(),
  categoryColor: Joi.string().max(20).optional()
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
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
<<<<<<< HEAD
=======
  // Campos adicionales para compatibilidad con frontend
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  image: Joi.string().uri().allow(null, ""),
  categoryColor: Joi.string().max(20)
}).min(1);
