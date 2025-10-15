import Joi from "joi";

export const createEventSchema = Joi.object({
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
});

export const updateEventSchema = Joi.object({
  title: Joi.string().min(2).max(120),
  description: Joi.string().allow(null, ""),
  category: Joi.string().min(2).max(60),
  groupId: Joi.string().uuid(),
  location: Joi.string().max(160),
  startAt: Joi.date(),
  endAt: Joi.date().min(Joi.ref("startAt")),
  visibility: Joi.string().valid("public", "members", "private"),
  ticketUrl: Joi.string().uri().allow(null, ""),
  publishAt: Joi.date().allow(null),
  // Campos adicionales para compatibilidad con frontend
  image: Joi.string().uri().allow(null, ""),
  categoryColor: Joi.string().max(20)
}).min(1);
