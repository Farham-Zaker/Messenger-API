import Joi from "joi";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";

export const setPasswordShcema = Joi.object({
  password: Joi.string()
    .required()
    .min(6)
    .max(30)
    .messages({
      ...stringValidationErrorsExtractor({ field: "password", required: true }),
      "string.min": "'password' must ba at least 6 character.",
      "string.max": "'password' can not be more than 30 character.",
    }),
  repeatPassword: Joi.string()
    .required()
    .messages(
      stringValidationErrorsExtractor({ field: "repeatPassword", required: true })
    ),
});
