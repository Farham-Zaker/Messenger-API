export type UserVerificationCode = {
  [phoneNumber: string]: number;
};
export type SendVerificationCodeBodyType = {
  areaCode: string;
  phoneNumber: string;
};
