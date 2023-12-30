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
const getPrivateChatByIdSchema = Joi.object({
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
const updatePrivateChatSchema = Joi.object({
  privateChatId: Joi.string().required().messages({
    "any.required": "'privateChatId' is required.",
    "string.base": "'privateChatId' must be a string.",
    "string.empty": "'privateChatId' can not be empty.",
  }),
  updatedAt: Joi.date().iso().optional().messages({
    "date.base": "'updatedAt' field must be a valid date.",
    "date.format":
      "'updatedAt' field must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).",
  }), 
  createdAt: Joi.date().iso().optional().messages({
    "date.base": "'updatedAt' field must be a valid date.",
    "date.format":
      "'updatedAt' field must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).",
  }),
});

export {
  createPrivateChatSchema,
  getAllPrivateChatSchema,
  getPrivateChatByIdSchema,
  updatePrivateChatSchema,
};
