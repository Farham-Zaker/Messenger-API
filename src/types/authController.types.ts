export type UserVerificationCode = {
  [phoneNumber: string]: number;
};
export type SendVerificationCodeBodyType = {
  areaCode: string;
  phoneNumber: string;
};
export type VerifyPhoneNumberBodyType = {
  areaCode: string;
  phoneNumber: string;
  verificationCode: string;
};
export type FindUserTypes = {
  userId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  bio?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  areaCode?: AreaCodeTypes;
};
type AreaCodeTypes = {
  areaCodeId?: string;
  areaCode?: string;
  area?: string;
};
export type CreateUserTypes = {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  phoneNumber: string;
  areaCodeId: string;
  bio: string | null;
  email: string | null;
  password: string | null;
  createdAt: Date;
};
export type CompleteProfileBodyType = {
  firstName: string;
  lastName: string;
  username: string;
};
