import { FastifyReply, FastifyRequest } from "fastify";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";
import UserServices from "../services/user.services";
import { SetPasswordRequeserBodyTypes } from "../types/userControllers.types";
import hashPassword from "../utils/hashPassword";

export default new (class channelController {
  async setPassword(
    request: FastifyRequest<{ Body: SetPasswordRequeserBodyTypes }>,
    reply: FastifyReply
  ) {
    const { password, repeatPassword } = request.body;
    const user = request.user;
    try {
      const userService: UserServices = request.diScope.resolve("userServices");

      if (password !== repeatPassword) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 400,
          message: "The password is not match together.",
        });
      }

      const targetUser = (await userService.findOne({
        condition: {
          userId: user?.userId,
        },
        selectedFields: {
          users: ["userId", "password"],
        },
      })) as {
        userId: string;
        password?: string;
      };

      if (targetUser.password && targetUser.password.length !== 0) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 403,
          message: "Tha targer user already has a password.",
        });
      }
      const hashedPassword: string = await hashPassword(password);

      await userService.update({
        condition: {
          userId: user?.userId,
        },
        data: {
          password: hashedPassword,
        },
      });

      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The password sat successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
})();
