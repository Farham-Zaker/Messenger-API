import { FastifyPluginCallback } from "fastify";
import authRoutes from "./auth.routes";
import privateChatRoutes from "./privateChat.routes";
import messageRoutesPlugin from "./message.routes";

const plugin: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });
  fastify.register(privateChatRoutes, {
    prefix: "/privateChat",
  });
  fastify.register(messageRoutesPlugin, { prefix: "/message" });
  done();
};

export default plugin;
