import Joi from "joi";

const validateTrueOrFalse = (value: string, helper: Joi.CustomHelpers) => {
  if (value != "true" && value != "false") {
    return helper.message({
      custom: `'${helper.state.path?.[0]}' must be 'true' or 'false'.`,
    });
  }
  return true;
};

export default validateTrueOrFalse;
