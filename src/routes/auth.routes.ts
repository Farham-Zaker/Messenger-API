import { FastifyPluginCallback } from "fastify";
import authController from "../controllers/auth.controllers";
import { sendVerificationCodeShema } from "../schemas/auth.schemas";
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
  });
  done();
};

export default registerAuthRoutesPlugin;
