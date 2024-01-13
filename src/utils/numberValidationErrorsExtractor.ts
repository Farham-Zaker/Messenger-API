import { LanguageMessages } from "joi";

type Parameter = {
  field: string;
  required: boolean;
};
const numberValidationErrorsExtractor = ({ field, required }: Parameter) => {
  if (required) {
    return {
      "any.required": `'${field}' is required.`,
      "number.base": `'${field}' must be number.`,
      "number.empty": `'${field}' can not be empty.`,
    } as LanguageMessages;
  }
  return {
    "number.base": `'${field}' must be number.`,
    "number.empty": `'${field}' can not be empty.`,
  } as LanguageMessages;
};
export default numberValidationErrorsExtractor;
