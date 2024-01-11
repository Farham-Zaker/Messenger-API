const numberValidationErrorsExtractor = (field: string) => {
  return {
    "number.base": `'${field}' must be number.`,
    "number.empty": `'${field}' can not be empty.`,
  };
};
export default numberValidationErrorsExtractor;
