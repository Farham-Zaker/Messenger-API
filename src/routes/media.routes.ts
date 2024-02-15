import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import { sendMediaSchema } from "../schemas/media.schemas";
const mediaRoutePlugin: FastifyPluginCallback = (fastify, option, done) => {
  fastify.route({
    url: "/send",
    method: "POST",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: sendMediaSchema }),
    ],
    handler: () => {},
  });

  done();
};

export default mediaRoutePlugin;
