const dateValidationErrorsExtractor = (field: string) => {
  return {
    "date.base": `'${field}' must be a valid date.`,
    "date.format": `'${field}' must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).`,
  };
};
export default dateValidationErrorsExtractor;
