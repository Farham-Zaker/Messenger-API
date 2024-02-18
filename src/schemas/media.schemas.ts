import Joi from "joi";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";
import validateTrueOrFalse from "../utils/validateTrueOrFalse";

export const sendMediaSchema = Joi.object({
  privateChatId: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({
        field: "privateChatId",
        required: false,
      })
    ),
  channelId: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({
        field: "channelId",
        required: false,
      })
    ),
  groupId: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({
        field: "groupId",
        required: false,
      })
    ),
})
  .xor("privateChatId", "channelId", "groupId")
  .messages({
    "object.xor":
      "Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.",
    "object.missing":
      "At least one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.",
  });
export const getAllMediaSchema = Joi.object({
  privateChatId: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "privateChatId", required: false })
  ),
  privateChat: Joi.string().when("privateChatId", {
    is: Joi.exist(),
    then: Joi.string()
      .messages(
        stringValidationErrorsExtractor({
          field: "privateChat",
          required: false,
        })
      )
      .custom((value, helper) => validateTrueOrFalse(value, helper)),
    otherwise: Joi.forbidden().messages({
      "any.unknown":
        "'privateChat' is not allowed when 'privateChatId' is not present.",
    }),
  }),
  groupId: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "groupId", required: false })
  ),
  group: Joi.string().when("groupId", {
    is: Joi.exist(),
    then: Joi.string()
      .messages(
        stringValidationErrorsExtractor({
          field: "group",
          required: false,
        })
      )
      .custom((value, helper) => validateTrueOrFalse(value, helper)),
    otherwise: Joi.forbidden().messages({
      "any.unknown": "'group' is not allowed when 'groupId' is not present.",
    }),
  }),
  channelId: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "channelId", required: false })
  ),
  channel: Joi.string().when("channelId", {
    is: Joi.exist(),
    then: Joi.string()
      .messages(
        stringValidationErrorsExtractor({
          field: "channel",
          required: false,
        })
      )
      .custom((value, helper) => validateTrueOrFalse(value, helper)),
    otherwise: Joi.forbidden().messages({
      "any.unknown":
        "'channel' is not allowed when 'channelId' is not present.",
    }),
  }),
  message: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "message", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
})
  .xor("privateChatId", "groupId", "channelId")
  .messages({
    "object.xor":
      "Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.",
    "object.missing":
      "At least one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.",
  });
