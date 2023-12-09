import Joi from "joi";
const sendVerificationCodeShema = Joi.object({
  areaCode: Joi.string().required().pattern(/^\+/).min(2).messages({
    "any.required": "'areaCode' is required.",
    "string.base": "'areaCode' must be a string",
    "string.empty": "'areaCode' can not be empty.",
    "string.pattern.base": "'areaCode' must begin with +.",
    "string.min": "'areaCode' can not be less than 2 characters.",
  }),
  phoneNumber: Joi.string().required().min(10).max(10).messages({
    "any.required": "'phoneNumber' is required.",
    "string.base": "'phoneNumber' must be a string.",
    "string.empty": "'phoneNumber' can not be empty.",
    "string.min": "'phoneNumber' can not be less than 10 characters.",
    "string.max": "'phoneNumber' can not be more than 10 characters.",
  }),
});
const verifyPhoneNumberSchema = Joi.object({
  areaCode: Joi.string().required().pattern(/^\+/).min(2).messages({
    "any.required": "'areaCode' is required.",
    "string.base": "'areaCode' must be a string",
    "string.empty": "'areaCode' can not be empty.",
    "string.pattern.base": "'areaCode' must begin with +.",
    "string.min": "'areaCode' can not be less than 2 characters.",
  }),
  phoneNumber: Joi.string().required().min(10).max(10).messages({
    "any.required": "'phoneNumber' is required.",
    "string.base": "'phoneNumber' must be a string.",
    "string.empty": "'phoneNumber' can not be empty.",
    "string.min": "'phoneNumber' can not be less than 10 characters.",
    "string.max": "'phoneNumber' can not be more than 10 characters.",
  }),
  verificationCode: Joi.string().required().messages({
    "any.required": "'verificationCode' is required.",
    "string.empty": "'verificationCode' can not be empty."
  }),
});
export {
  sendVerificationCodeShema,
  verifyPhoneNumberSchema,
};
