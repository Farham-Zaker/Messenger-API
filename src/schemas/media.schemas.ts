import Joi from "joi";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";

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
