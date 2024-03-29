import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import {
  getMessageByIdSchema,
  getMessagesSchema,
  sendMessageSchema,
  updateMessageSchema,
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
      validate({ target: "query", schema: getMessageByIdSchema }),
    ],
    handler: messageControllers.getMessageById,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/update",
    method: "PUT",
    preHandler: [
      isLogged,
      validate({ target: "body", schema: updateMessageSchema }),
    ],
    handler: messageControllers.updateMessage,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/delete/:messageId",
    method: "DELETE",
    preHandler: [isLogged],
    handler: messageControllers.deleteMessage,
    schema: {
      hide: true,
    },
  });
  done();
};

export default messageRoutesPlugin;
