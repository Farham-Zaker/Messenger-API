import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";
import UserServices from "../services/user.services";
import { JwtPayload } from "jsonwebtoken";

const isLogged = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const userServices: UserServices = request.diScope.resolve("userServices");
  const token = request.headers.token as string;

  try {
    if (!token) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 401,
        message:
          "Token is required. Please include the token in the 'token' header.",
      });
    }

    const decodedToken: JwtPayload | string = userServices.decodeToken(token);
    if (typeof decodedToken === "string") {
      return sendResponse(reply, {
        statusCode: 403,
        status: "error",
        message: "Invalid token fotrmat.",
      });
    }

    if (request.url === "/auth/complete-profile") {
      request.user = decodedToken;
    }
    if (decodedToken?.isProfileCompleted === false) {
      return sendResponse(reply, {
        statusCode: 403,
        status: "error",
        message:
          "Your profile isn't completed. So navigate to '/auth/complete-profile' route by 'PUT' request to complete your profile info. ",
      });
    }
    request.user = decodedToken;
  } catch (error) {
    return sendErrorResponse(reply, error);
  }
};

export default isLogged;
