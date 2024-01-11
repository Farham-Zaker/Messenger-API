import Joi from "joi";
import validateTrueOrFalse from "../utils/validateTrueOrFalse";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";
import numberValidationErrorsExtractor from "../utils/numberValidationErrorsExtractor";

const sendMessageSchema = Joi.object({
  text: Joi.string()
    .required()
    .messages({
      "any.required": "'text' is required.",
      ...stringValidationErrorsExtractor("text"),
    }),
  privateChatId: Joi.string().messages(
    stringValidationErrorsExtractor("privateChatId")
  ),
  groupId: Joi.string().messages(stringValidationErrorsExtractor("groupId")),
  channelId: Joi.string().messages(
    stringValidationErrorsExtractor("channelId")
  ),
})
  .xor("privateChatId", "groupId", "channelId")
  .messages({
    "object.xor":
      "Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.",
    "object.missing":
      "At least one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.",
  });
const getMessagesSchema = Joi.object({
  privateChatId: Joi.string().messages(
    stringValidationErrorsExtractor("privateChatId")
  ),
  groupId: Joi.string().messages(stringValidationErrorsExtractor("groupId")),
  channelId: Joi.string().messages(
    stringValidationErrorsExtractor("channelId")
  ),
  sender: Joi.string()
    .optional()
    .messages(stringValidationErrorsExtractor("sender"))
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  media: Joi.string()
    .optional()
    .messages(stringValidationErrorsExtractor("media"))
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  privateChat: Joi.string().when("privateChatId", {
    is: Joi.exist(),
    then: Joi.string()
      .messages(stringValidationErrorsExtractor("privateChat"))
      .custom((value, helper) => {
        validateTrueOrFalse(value, helper);
      }),
    otherwise: Joi.forbidden().messages({
      "any.unknown":
        "'privateChat' is not allowed when 'privateChatId' is not present.",
    }),
  }),
  channel: Joi.string()
    .when("channelId", {
      is: Joi.exist(),
      then: Joi.string().messages(stringValidationErrorsExtractor("channel")),
      otherwise: Joi.forbidden().messages({
        "any.unknown":
          "'channel' is not allowed when 'channelId' is not present.",
      }),
    })
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  group: Joi.string()
    .when("groupId", {
      is: Joi.exist(),
      then: Joi.string().messages(stringValidationErrorsExtractor("group")),
      otherwise: Joi.forbidden().messages({
        "any.unknown": "'group' is not allowed when 'groupId' is not present.",
      }),
    })
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  searchTerm: Joi.string().messages(
    stringValidationErrorsExtractor("searchTerm")
  ),
  take: Joi.number().messages(numberValidationErrorsExtractor("take")),
})
  .xor("privateChatId", "groupId", "channelId")
  .messages({
    "object.xor":
      "Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.",
    "object.missing":
      "At least one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.",
  });

export {
  sendMessageSchema,
  getMessagesSchema,
};
