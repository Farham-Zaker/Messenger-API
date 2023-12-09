import { FastifyPluginCallback } from "fastify";
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
  });
  done();
};

export default registerAuthRoutesPlugin;
