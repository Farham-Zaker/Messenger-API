import Joi from "joi";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";
import validateTrueOrFalse from "../utils/validateTrueOrFalse";

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
export const getAllChannelsSchema = Joi.object({
  owner: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "owner", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  admins: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "admins", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  members: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "members", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
});
