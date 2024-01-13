import Joi from "joi";
import validateTrueOrFalse from "../utils/validateTrueOrFalse";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";
import dateValidationErrorsExtractor from "../utils/dateValidationErrorsExtractor";
import numberValidationErrorsExtractor from "../utils/numberValidationErrorsExtractor";

const sendMessageSchema = Joi.object({
  text: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "text", required: true })
    ),
  privateChatId: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "privateChatId", required: false })
  ),
  groupId: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "groupId", required: false })
  ),
  channelId: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "channelId", required: false })
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
    stringValidationErrorsExtractor({ field: "privateChatId", required: false })
  ),
  groupId: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "groupId", required: false })
  ),
  channelId: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "channelId", required: false })
  ),
  sender: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "sender", required: true })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  media: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "media", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  privateChat: Joi.string().when("privateChatId", {
    is: Joi.exist(),
    then: Joi.string()
      .messages(
        stringValidationErrorsExtractor({
          field: "privateChat",
          required: false,
        })
      )
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
      then: Joi.string().messages(
        stringValidationErrorsExtractor({
          field: "privateChat",
          required: false,
        })
      ),
      otherwise: Joi.forbidden().messages({
        "any.unknown":
          "'channel' is not allowed when 'channelId' is not present.",
      }),
    })
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  group: Joi.string()
    .when("groupId", {
      is: Joi.exist(),
      then: Joi.string().messages(
        stringValidationErrorsExtractor({ field: "group", required: false })
      ),
      otherwise: Joi.forbidden().messages({
        "any.unknown": "'group' is not allowed when 'groupId' is not present.",
      }),
    })
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  searchTerm: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "searchTerm", required: false })
  ),
  take: Joi.number().messages(
    numberValidationErrorsExtractor({ field: "take", required: false })
  ),
})
  .xor("privateChatId", "groupId", "channelId")
  .messages({
    "object.xor":
      "Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.",
    "object.missing":
      "At least one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.",
  });

const getMessageByIdSchema = Joi.object({
  sender: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "sender", required: true })
    )
    .custom((value, helper) => {
      return validateTrueOrFalse(value, helper);
    }),
  privateChat: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "privateChat", required: false })
    )
    .custom((value, helper) => {
      return validateTrueOrFalse(value, helper);
    }),
  group: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "group", required: false })
    )
    .custom((value, helper) => {
      return validateTrueOrFalse(value, helper);
    }),
  channel: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "privateChat", required: false })
    )
    .custom((value, helper) => {
      return validateTrueOrFalse(value, helper);
    }),
  media: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "media", required: false })
    )
    .custom((value, helper) => {
      return validateTrueOrFalse(value, helper);
    }),
});
const updateMessageSchema = Joi.object({
  messageId: Joi.string()
    .required()
    .messages({
      "any.required": "'messageId' is required.",
      ...stringValidationErrorsExtractor({
        field: "messageId",
        required: true,
      }),
    }),
  text: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "text", required: false })
    ),
  replyOf: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "replyOf", required: false })
    ),
  updatedAt: Joi.date()
    .iso()
    .optional()
    .messages(
      dateValidationErrorsExtractor({ field: "updatedAt", required: false })
    ),
});
export {
  sendMessageSchema,
  getMessagesSchema,
  getMessageByIdSchema,
  updateMessageSchema,
};
