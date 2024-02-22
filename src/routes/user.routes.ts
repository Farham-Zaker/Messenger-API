import { FastifyPluginCallback } from "fastify";
import validate from "../middlewares/validation.middleware";
import isLogged from "../middlewares/islogged";
const userRoutePlugin: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.route({
    url: "/set-password",
    preHandler: [
      isLogged,
    ],
    method: "POST",
    handler: () => {},
  });
};

export default userRoutePlugin;
