import Joi from "joi";

const createPrivateChatSchema = Joi.object({
  partnerUserId: Joi.required().messages({
    "any.required": "'partnerUserId' is required.",
  }),
});
const getAllPrivateChatSchema = Joi.object({
  user1: Joi.optional().custom((value, helper) => {
    if (value !== "true" && value !== "false") {
      return helper.error("'user1' field must be 'true' or 'false'.");
    }
    return true;
  }),
  user2: Joi.optional().custom((value, helper) => {
    if (value !== "true" && value !== "false") {
      return helper.error("'user1' field must be 'true' or 'false'.");
    }
    return true;
  }),
});


export {
  createPrivateChatSchema,
  getAllPrivateChatSchema,
};
