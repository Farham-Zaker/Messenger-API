import { FastifyPluginCallback } from "fastify";
import authRoutes from "./auth.routes";
import privateChatRoutes from "./privateChat.routes";
import messageRoutesPlugin from "./message.routes";
import groupRoutesPlugin from "./group.routes";
import channelRoutesPlugin from "./channel.routes";
import mediaRoutePlugin from "./media.routes";
import userRoutePlugin from "./user.routes";

const plugin: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });
  fastify.register(privateChatRoutes, {
    prefix: "/privateChat",
  });
  fastify.register(messageRoutesPlugin, { prefix: "/message" });
  fastify.register(groupRoutesPlugin, {
    prefix: "/group",
  });
  fastify.register(channelRoutesPlugin, { prefix: "/channel" });
  fastify.register(mediaRoutePlugin, { prefix: "/media" });
  fastify.register(userRoutePlugin, { prefix: "/user" });
  done();
};

export default plugin;
