import { FastifyPluginCallback } from "fastify";
import authController from "../controllers/auth.controllers";
import {
  completeProfileShema,
  sendVerificationCodeShema,
  verifyPhoneNumberSchema,
} from "../schemas/auth.schemas";
import validate from "../middlewares/validation.middleware";
import isLogged from "../middlewares/islogged";
const registerAuthRoutesPlugin: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.route({
    method: "POST",
    url: "/send-verification-code",
    preHandler: validate({ target: "body", schema: sendVerificationCodeShema }),
    handler: authController.sendVerificationCode,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    method: "POST",
    url: "/verify-phone-number",
    preHandler: validate({ target: "body", schema: verifyPhoneNumberSchema }),
    handler: authController.verifyPhoneNumber,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    method: "PUT",
    url: "/complete-profile",
    preHandler: [
      isLogged,
      validate({ target: "body", schema: completeProfileShema }),
    ],
    handler: authController.completeProfile,
    schema: {
      hide: true,
    },
  });
  done();
};

export default registerAuthRoutesPlugin;
