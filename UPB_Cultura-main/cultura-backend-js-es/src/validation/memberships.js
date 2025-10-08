import Joi from "joi";

export const upsertMembershipSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  groupId: Joi.string().uuid().required(),
  role: Joi.string().valid("coordinator", "leader", "member").required()
});

export const updateMembershipSchema = Joi.object({
  role: Joi.string().valid("coordinator", "leader", "member").required()
});
