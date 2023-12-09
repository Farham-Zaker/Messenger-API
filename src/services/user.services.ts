import { JwtPayload, Secret } from "jsonwebtoken";
import prismaServices from "../prisma/prismaServices";
import jwt from "jsonwebtoken";
import {
  CreateUserParamatersType,
  CreateUserType,
  DecodedTokenTypes,
  FindUserPrametersTypes,
  FindUserTypes,
  GenerateTokenType,
  UpdateUserParametersType,
} from "../types/userServices.types";
import databaseSelector from "../utils/databaseSelector";
import sendResponse from "../utils/sendResponse";

class UserServices {
  async findOne({
    condition,
    selectedFields,
  }: FindUserPrametersTypes): Promise<FindUserTypes | null> {
    const user: FindUserTypes | null = await prismaServices.users.findFirst({
      where: condition,
      select: databaseSelector("users", selectedFields),
    });
    return user;
  }

  async create(data: CreateUserParamatersType) {
    const user: CreateUserType = await prismaServices.users.create({
      data,
    });
    return user;
  }
  async update({ data, condition }: UpdateUserParametersType) {
    await prismaServices.users.update({
      data,
      where: condition,
    });
  }
  generateToken({
    reply,
    userId,
    isProfileCompleted,
  }: GenerateTokenType): void | string {
    const JWT_KEY: Secret = process.env.JWT_KEY!;

    if (!JWT_KEY) {
      return sendResponse(reply, {
        statusCode: 403,
        status: "error",
        message: "Jwt secret key is not found.",
      });
    }
    const token: string = jwt.sign({ userId, isProfileCompleted }, JWT_KEY, {
      expiresIn: Date.now() + 100 * 60 * 60 * 24 * 30 * 3,
    });

    if (!token) {
      return sendResponse(reply, {
        statusCode: 403,
        status: "error",
        message: "Token is not found.",
      });
    }
    return token;
  }
  decodeToken(token: string): JwtPayload | string {
    const JWT_KEY: Secret = process.env.JWT_KEY!;
    const decodedToken: JwtPayload | string = jwt.verify(token, JWT_KEY);
    return decodedToken;
  }
}

export default UserServices;
