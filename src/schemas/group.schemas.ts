import Joi, { LanguageMessages } from "joi";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";
import validateTrueOrFalse from "../utils/validateTrueOrFalse";

const createGroupSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({
        field: "title",
        required: true,
      }) as LanguageMessages
    ),
  bio: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "bio", required: false })
  ),
  imagePath: Joi.string().messages(
    stringValidationErrorsExtractor({ field: "imagePath", required: false })
  ),
});
const addAdminSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "userId", required: true })
    ),
  groupId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "groupId", required: true })
    ),
});
const addMemberToGroupSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "userId", required: true })
    ),
  groupId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "groupId", required: true })
    ),
});
const getAllGroupsSchema = Joi.object({
  owner: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "owner", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
});
export {
  createGroupSchema,
  addAdminSchema,
  addMemberToGroupSchema,
  getAllGroupsSchema,
};
