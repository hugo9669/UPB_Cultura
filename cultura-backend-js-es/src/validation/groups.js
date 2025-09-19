import Joi from "joi";

export const createGroupSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  category: Joi.string().min(2).max(60).required(),
  description: Joi.string().allow(null, "").optional(),
  logoUrl: Joi.string().uri().allow(null, "").optional()
});

export const updateGroupSchema = Joi.object({
  name: Joi.string().min(2).max(120),
  category: Joi.string().min(2).max(60),
  description: Joi.string().allow(null, ""),
  logoUrl: Joi.string().uri().allow(null, "")
}).min(1);
