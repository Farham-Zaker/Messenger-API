import { FastifyPluginCallback } from "fastify";
const registerAuthRoutesPlugin: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.route({
    method: "POST",
    url: "/send-verification-code",
  });
  done();
};

export default registerAuthRoutesPlugin;
