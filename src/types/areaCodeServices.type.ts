import { Prisma } from "@prisma/client";

export interface FindAreaCodePrametersTypes {
  condition: Prisma.area_codesWhereInput;
  selectedFields: {
    areaCodes: string[],
    users?: string[]
  };
}
export interface FindAreaCodeTypes {
  areaCodeId?: string;
  areaCode?: string;
  area?: string;
  users?: UserType;
}
export interface UserType {
  userId?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  phoneNumber?: string;
  bio?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
}
