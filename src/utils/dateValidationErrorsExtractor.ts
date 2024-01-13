import { LanguageMessages } from "joi";

type Parameter = {
  field: string;
  required: boolean;
};
const dateValidationErrorsExtractor = ({ field, required }: Parameter) => {
  if (required) {
    return {
      "any.required": `'${field}' is required.`,
      "date.base": `'${field}' must be a valid date.`,
      "date.format": `'${field}' must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).`,
    } as LanguageMessages;
  }
  return {
    "date.base": `'${field}' must be a valid date.`,
    "date.format": `'${field}' must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).`,
  } as LanguageMessages;
};
export default dateValidationErrorsExtractor;
