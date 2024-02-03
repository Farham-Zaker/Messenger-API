import Joi from "joi";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";
import validateTrueOrFalse from "../utils/validateTrueOrFalse";
import dateValidationErrorsExtractor from "../utils/dateValidationErrorsExtractor";

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
export const getChannelSchema = Joi.object({
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
export const getAllAdminsOrMembersShcema = Joi.object({
  channelId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "channelId", required: true })
    ),
  user: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "user", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  channel: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "channel", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
});
export const getOneAdminOrMemberSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "userId", required: true })
    ),
  user: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "user", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  channelId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "channelId", required: true })
    ),
  channel: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "channel", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
});
export const updateChannelSchema = Joi.object({
  channelId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "channelId", required: true })
    ),
  title: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "title", required: false })
    ),
  bio: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "bio", required: false })
    ),
  updatedAt: Joi.string()
    .optional()
    .messages(
      dateValidationErrorsExtractor({ field: "updatedat", required: false })
    ),
});
