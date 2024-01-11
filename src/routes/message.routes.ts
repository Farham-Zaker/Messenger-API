import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import {
  getMessagesSchema,
  sendMessageSchema,
} from "../schemas/message.schemas";
import messageControllers from "../controllers/message.controllers";
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
    handler: messageControllers.sendMessageSchema,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getMessagesSchema }),
    ],
    handler: messageControllers.getAllMessages,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get/:messageId",
    method: "GET",
    preHandler: [
      isLogged,
    ],
    schema: {
      hide: true,
    },
  });
  done();
};

export default messageRoutesPlugin;
