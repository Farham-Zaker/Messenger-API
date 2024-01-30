import Joi from "joi";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";

export const createChannelShcema = Joi.object({
  title: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "title", required: true })
    ),
  bio: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "bio", required: true })
    ),
  imagePath: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "imagePath", required: false })
  ),
});

export const addAdminSchema = Joi.object({
  channelId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "channelId", required: true })
    ),
  userId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "userId", required: true })
    ),
});
