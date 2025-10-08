import Joi from "joi";

export const createAnnouncementSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
  title: Joi.string().min(2).max(150).required(),
  content: Joi.string().min(1).required()
});

export const updateAnnouncementSchema = Joi.object({
  title: Joi.string().min(2).max(150),
  content: Joi.string().min(1)
}).min(1);
