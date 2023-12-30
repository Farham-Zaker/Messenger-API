import Joi from "joi";

const createPrivateChatSchema = Joi.object({
  partnerUserId: Joi.required().messages({
    "any.required": "'partnerUserId' is required.",
  }),
});

export {
  createPrivateChatSchema,
};
