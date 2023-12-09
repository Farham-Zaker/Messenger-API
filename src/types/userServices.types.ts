import { Prisma } from "@prisma/client";
import { FastifyReply } from "fastify";

export interface FindUserPrametersTypes {
  condition: Prisma.usersWhereInput;
  selectedFields: {
    users: string[];
    areaCode?: string[];
  };
}
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
  areaCode?: areaCodeTypes;
};
type areaCodeTypes = {
  areaCodeId: string;
  areaCode: string;
  area: string;
};
export type GenerateTokenType = {
  reply: FastifyReply;
  userId: string;
  isProfileCompleted: boolean;
};
export type CreateUserParamatersType = {
  firstName?: string;
  lastName?: string;
  username?: string;
  areaCodeId: string;
  phoneNumber: string;
  bio?: string;
  email?: string;
  password?: string;
};
export type CreateUserType = {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  areaCodeId: string;
  phoneNumber: string;
  bio: string | null;
  email: string | null;
  password: string | null;
  createdAt: Date;
};
export type UpdateUserParametersType = {
  data: {
    firstName?: string;
    lastName?: string;
    username?: string;
    areaCodeId?: string;
    phoneNumber?: string;
    bio?: string;
    email?: string;
    password?: string;
  };
  condition: {
    userId: string;
  };
};
export type DecodedTokenTypes = {
  userId: string;
  isProfileCompleted: boolean;
  iat: number;
  exp: number;
};
