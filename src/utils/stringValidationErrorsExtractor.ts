const stringValidationErrorsExtractor = (field: string) => {
  return {
    "string.base": `'${field}' must be string.`,
    "string.empty": `'${field}' can not be empty.`,
  };
};
export default stringValidationErrorsExtractor;
