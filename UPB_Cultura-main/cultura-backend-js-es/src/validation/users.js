import Joi from "joi";

export const createUserSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required(),
  correo: Joi.string().email().required(),
  contrasena: Joi.string().min(6).required(),
  rol: Joi.string().valid('administrador', 'usuario', 'Lcultural').default('usuario')
});

export const updateUserSchema = Joi.object({
  nombre: Joi.string().min(3).max(100),
  correo: Joi.string().email(),
  contrasena: Joi.string().min(6).allow('', null).optional(),
  rol: Joi.string().valid('administrador', 'usuario', 'Lcultural')
}).min(1); // Al menos un campo debe estar presente

