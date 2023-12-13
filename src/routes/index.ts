import { FastifyPluginCallback } from "fastify";
import authRoutes from "./auth.routes";
import privateChatRoutes from "./privateChat.routes";

const plugin: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });
  fastify.register(privateChatRoutes, {
    prefix: "/privateChat",
  });
  done();
};

export default plugin;
