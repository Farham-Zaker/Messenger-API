import Joi, { LanguageMessages } from "joi";
import stringValidationErrorsExtractor from "../utils/stringValidationErrorsExtractor";

const createGroupSchmea = Joi.object({
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

export { createGroupSchmea };
