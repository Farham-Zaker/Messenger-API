import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import {
  getAllMediaSchema,
  getMediaByIdSchema,
  sendMediaSchema,
} from "../schemas/media.schemas";
import mediaController from "../controllers/media.controller";
const mediaRoutePlugin: FastifyPluginCallback = (fastify, option, done) => {
  fastify.route({
    url: "/send",
    method: "POST",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: sendMediaSchema }),
    ],
    handler: mediaController.sendMedia,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/getAll",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getAllMediaSchema }),
    ],
    handler: mediaController.getAllMedia,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get/:mediaId",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getMediaByIdSchema }),
    ],
    handler: mediaController.getMediaById,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/delete/:mediaId",
    method: "DELETE",
    preHandler: isLogged,
    handler: mediaController.delete,
    schema: {
      hide: true,
    },
  });
  done();
};

export default mediaRoutePlugin;
