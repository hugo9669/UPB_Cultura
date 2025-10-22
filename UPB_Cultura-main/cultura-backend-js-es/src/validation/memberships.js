import Joi from "joi";

export const upsertMembershipSchema = Joi.object({
  userId: Joi.alternatives().try(
    Joi.number().integer().positive(),
    Joi.string().pattern(/^\d+$/)
  ).required(),
  groupId: Joi.alternatives().try(
    Joi.number().integer().positive(),
    Joi.string().pattern(/^\d+$/)
  ).required(),
  role: Joi.string().valid("coordinator", "leader", "member", "miembro").default("miembro")
});

export const updateMembershipSchema = Joi.object({
  role: Joi.string().valid("coordinator", "leader", "member", "miembro").required()
});
