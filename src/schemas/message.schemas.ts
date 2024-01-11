import Joi from "joi";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";

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

export {
  sendMessageSchema,
};
