import { LanguageMessages } from "joi";

type Parameter = {
  field: string;
  required: boolean;
};
const stringValidationErrorsExtractor = ({ field, required }: Parameter) => {
  if (required) {
    return {
      "any.required": `'${field}' is required.`,
      "string.base": `'${field}' must be string.`,
      "string.empty": `'${field}' can not be empty.`,
    } as LanguageMessages;
  }
  return {
    "string.base": `'${field}' must be string.`,
    "string.empty": `'${field}' can not be empty.`,
  } as LanguageMessages;
};
export default stringValidationErrorsExtractor;
