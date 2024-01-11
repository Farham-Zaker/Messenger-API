import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import { sendMessageSchema } from "../schemas/message.schemas";
const messageRoutesPlugin: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.route({
    url: "/send",
    method: "POST",
    preHandler: [
      isLogged,
      validate({ target: "body", schema: sendMessageSchema }),
    ],
    schema: {
      hide: true,
    },
  });

  done();
};

export default messageRoutesPlugin;
