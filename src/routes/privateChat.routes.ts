import { FastifyPluginCallback } from "fastify";
import privateChatControllers from "../controllers/privateChat.controllers";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import {
  createPrivateChatSchema,
  getAllPrivateChatSchema,
} from "../schemas/privateChat.schema";

const privateChatRoutes: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.route({
    url: "/create",
    method: "POST",
    preHandler: [
      isLogged,
      validate({ target: "body", schema: createPrivateChatSchema }),
    ],
    handler: privateChatControllers.createChat,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getAllPrivateChatSchema }),
    ],
    handler: privateChatControllers.getAllPrivateChat,
    schema: {
      hide: true,
    },
  });
};

export default privateChatRoutes;
