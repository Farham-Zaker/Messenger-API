import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import { sendMediaSchema } from "../schemas/media.schemas";
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
  });

  done();
};

export default mediaRoutePlugin;
