import { FastifyPluginCallback } from "fastify";
import authController from "../controllers/auth.controllers";
import {
  sendVerificationCodeShema,
  verifyPhoneNumberSchema,
} from "../schemas/auth.schemas";
import validate from "../middlewares/validation.middleware";
const registerAuthRoutesPlugin: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.route({
    method: "POST",
    url: "/send-verification-code",
    preHandler: validate(sendVerificationCodeShema),
    handler: authController.sendVerificationCode,
  });
  fastify.route({
    method: "POST",
    url: "/verify-phone-number",
    preHandler: validate(verifyPhoneNumberSchema),
    handler: authController.verifyPhoneNumber,
  });
  done();
};

export default registerAuthRoutesPlugin;
