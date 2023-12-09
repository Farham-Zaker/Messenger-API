import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";
import {
  UserVerificationCode,
  SendVerificationCodeBodyType,
  VerifyPhoneNumberBodyType,
  FindUserTypes,
  CreateUserTypes,
  CompleteProfileBodyType,
} from "../types/authController.types";
import AreaCodeServices from "../services/areaCode.services";
import UserServices from "../services/user.services";
import { JwtPayload } from "jsonwebtoken";

const usersVerificationCode: UserVerificationCode = {};

function scheduleCodeRemoval(phoneNumber: string) {
  setTimeout(() => {
    delete usersVerificationCode[phoneNumber];
  }, 1000 * 60 * 2);
}
export default new (class authController {
  async sendVerificationCode(
    request: FastifyRequest<{ Body: SendVerificationCodeBodyType }>,
    reply: FastifyReply
  ) {
    const { areaCode, phoneNumber } = request.body;
    const areaCodeServices: AreaCodeServices =
      request.diScope.resolve("areaCodeServices");

    try {
      const isAreaCodeAvialable = !!(await areaCodeServices?.findOne({
        condition: { areaCode },
        selectedFields: { areaCodes: ["areaCodeId"] },
      }));
      if (!isAreaCodeAvialable) {
        return sendResponse(reply, {
          statusCode: 404,
          status: "fail",
          message: `There is not area code such ${areaCode}`,
        });
      }
      const randomNumber: number = Math.floor(
        Math.random() * (999999 - 100000) + 100000
      );

      usersVerificationCode[areaCode + phoneNumber] = randomNumber;
      scheduleCodeRemoval(areaCode + phoneNumber);

      const SMS_SERVICE_API_KEY = process.env.SMS_SERVICE_API_KEY;
      const SMS_SEVICE_TEMPLATE_KEY = process.env.SMS_SEVICE_TEMPLATE_KEY;
      axios.post(
        `https://smsyar.linto.ir/api/v1/sendsms?api_key=${SMS_SERVICE_API_KEY}&&phone=09300619606&&template=${SMS_SEVICE_TEMPLATE_KEY}&&value=${randomNumber}`
      );

      console.log(randomNumber);
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: `Verification code was sent to '${areaCode + phoneNumber}'`,
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
  async verifyPhoneNumber(
    request: FastifyRequest<{ Body: VerifyPhoneNumberBodyType }>,
    reply: FastifyReply
  ) {
    const userServices: UserServices = request.diScope.resolve("userServices");
    const areaCodeServices: AreaCodeServices =
      request.diScope.resolve("areaCodeServices");

    const { areaCode, phoneNumber, verificationCode } = request.body;

    try {
      const areaCodeInfo = await areaCodeServices?.findOne({
        condition: { areaCode },
        selectedFields: {
          areaCodes: ["areaCodeId", "areaCode"],
        },
      });

      if (!areaCodeInfo) {
        return sendResponse(reply, {
          statusCode: 404,
          status: "error",
          message: `There is not area code with such ${areaCode}`,
        });
      }

      const userVerificationCode: number =
        usersVerificationCode[areaCode + phoneNumber];

      if (!userVerificationCode) {
        return sendResponse(reply, {
          status: "fail",
          statusCode: 404,
          message: "Verification code have not sent to number.",
        });
      }

      if (verificationCode !== userVerificationCode.toString()) {
        return sendResponse(reply, {
          statusCode: 401,
          status: "error",
          message: "Invalid verififcation code.",
        });
      }

      const user: FindUserTypes | null = await userServices?.findOne({
        condition: {
          phoneNumber,
        },
        selectedFields: { users: ["userId"], areaCode: ["areaCodeId"] },
      })!;
      if (!user) {
        const createdUser: CreateUserTypes | undefined =
          await userServices?.create({
            areaCodeId: areaCodeInfo.areaCodeId as string,
            phoneNumber,
          });

        if (!createdUser) {
          return sendResponse(reply, {
            statusCode: 404,
            status: "error",
            message: "An error occurred while creating user.",
          });
        }
        const token: string = userServices?.generateToken({
          reply,
          userId: createdUser.userId as string,
          isProfileCompleted: false,
        }) as string;

        return sendResponse(reply, {
          statusCode: 201,
          status: "success",
          message:
            "Your phone number was verified successfully. But you haven't an account. So navigate to '/auth/complete-profile' route by 'PUT' request to complete your profile info.",
          token,
        });
      }
      if (user && !user.firstName && !user.lastName && !user.username) {
        const token: string | void = userServices?.generateToken({
          reply,
          userId: user.userId as string,
          isProfileCompleted: false,
        })!;

        return sendResponse(reply, {
          statusCode: 201,
          status: "success",
          message:
            "Your phone number was verified successfully. But your profile isn't completed. So navigate to '/auth/complete-profile' route by 'PUT' request to complete your profile info.",
          token,
        });
      }

      const token: string | void = userServices?.generateToken({
        reply,
        userId: user.userId as string,
        isProfileCompleted: true,
      });

      return sendResponse(reply, {
        statusCode: 200,
        status: "success",
        message:
          "Your phone number was vefied successfully. Now you logged in.",
        token,
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
  async completeProfile(
    request: FastifyRequest<{ Body: CompleteProfileBodyType }>,
    reply: FastifyReply
  ) {
    const userServices: UserServices = request.diScope.resolve("userServices");
   
    const { firstName, lastName, username } = request.body;
    const { userId, isProfileCompleted } = request.user as JwtPayload;
    try {
      if (isProfileCompleted) {
        return sendResponse(reply, {
          status: "success",
          statusCode: 200,
          message: "Your profile is complete. No further action is needed.",
        });
      }
      const isUsernameAvialable: boolean = !!(await userServices.findOne({
        condition: { username },
        selectedFields: {
          users: ["userId"],
        },
      }));
      if (isUsernameAvialable) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 409,
          message: "There is an user with such username. Chose another.",
        });
      }

      await userServices.update({
        data: {
          firstName,
          lastName,
          username,
        },
        condition: {
          userId: userId as string,
        },
      });

      const newToken: string | void = userServices.generateToken({
        reply,
        userId,
        isProfileCompleted: true,
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "Your profile is completed successfuly.",
        note: "Use token from now on.",
        token: newToken,
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
})();
