import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().max(120).allow(null, ""),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
