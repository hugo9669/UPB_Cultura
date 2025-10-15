import Joi from "joi";

export const createGroupSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  category: Joi.string().min(2).max(60).required(),
  description: Joi.string().allow(null, "").optional(),
  logoUrl: Joi.string().uri().allow(null, "").optional(),
  // Campos adicionales para compatibilidad con frontend
  image: Joi.string().uri().allow(null, "").optional(),
  categoryColor: Joi.string().max(20).optional(),
  members: Joi.number().integer().min(0).optional(),
  founded: Joi.string().max(10).allow(null, "").optional(),
  director: Joi.string().max(120).allow(null, "").optional(),
  photos: Joi.array().items(Joi.string()).optional()
});

export const updateGroupSchema = Joi.object({
  name: Joi.string().min(2).max(120),
  category: Joi.string().min(2).max(60),
  description: Joi.string().allow(null, ""),
  logoUrl: Joi.string().uri().allow(null, ""),
  // Campos adicionales para compatibilidad con frontend
  image: Joi.string().uri().allow(null, ""),
  categoryColor: Joi.string().max(20),
  members: Joi.number().integer().min(0),
  founded: Joi.string().max(10).allow(null, ""),
  director: Joi.string().max(120).allow(null, ""),
  photos: Joi.array().items(Joi.string())
}).min(1);
