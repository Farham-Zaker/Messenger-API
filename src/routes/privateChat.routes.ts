import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";

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
    ]
  });
};

export default privateChatRoutes;
