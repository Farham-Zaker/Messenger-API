import Joi, { LanguageMessages } from "joi";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";
import validateTrueOrFalse from "../utils/validateTrueOrFalse";
import dateValidationErrorsExtractor from "../utils/dateValidationErrorsExtractor";

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
const getAllGroupAdminsSchema = Joi.object({
  groupId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "groupId", required: true })
    ),
  user: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "user", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  group: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "group", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
});
const getAllGroupMembersSchema = Joi.object({
  groupId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "groupId", required: true })
    ),
  user: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "user", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
  group: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "group", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
});
const getGroupById = Joi.object({
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
  messages: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "messages", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
});
const getAdminByIdSchema = Joi.object({
  groupId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "groupId", required: true })
    ),
  group: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "group", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
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
});
const getOneMemberSchema = Joi.object({
  groupId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "groupId", required: true })
    ),
  group: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "group", required: false })
    )
    .custom((value, helper) => validateTrueOrFalse(value, helper)),
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
});
const updateGroupSchema = Joi.object({
  groupId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "groupId", required: true })
    ),
  title: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "title", required: false })
    ),
  bio: Joi.string()
    .optional()
    .min(3)
    .messages({
      ...stringValidationErrorsExtractor({ field: "bio", required: false }),
      "string.min": "'bio' length must be at least 3 characters long",
    }),
  imagePath: Joi.string()
    .optional()
    .messages(
      stringValidationErrorsExtractor({ field: "imagePath", required: false })
    ),
  updatedAt: Joi.date()
    .iso()
    .optional()
    .messages(
      dateValidationErrorsExtractor({ field: "updatedAt", required: false })
    ),
});
const removeAdminAndMemberSchema = Joi.object({
  groupId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "groupId", required: true })
    ),
  userId: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "userId", required: true })
    ),
});
export {
  createGroupSchema,
  addAdminSchema,
  addMemberToGroupSchema,
  getAllGroupsSchema,
  getAllGroupAdminsSchema,
  getAllGroupMembersSchema,
  getGroupById,
  getAdminByIdSchema,
  getOneMemberSchema,
  updateGroupSchema,
  removeAdminAndMemberSchema,
};
