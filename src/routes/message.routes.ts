import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
const messageRoutesPlugin: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.route({
    url: "/send",
    method: "POST",
    preHandler: [isLogged],
    schema: {
      hide: true,
    },
  });

  done();
};

export default messageRoutesPlugin;
