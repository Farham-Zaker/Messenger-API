import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";

const mediaRoutePlugin: FastifyPluginCallback = (fastify, option, done) => {
  fastify.route({
    url: "/send",
    method: "POST",
    preHandler: [
      isLogged,
    ],
  });

  done();
};

export default mediaRoutePlugin;
