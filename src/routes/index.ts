import { FastifyPluginCallback } from "fastify";
import authRoutes from "./auth.routes";

const plugin: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });
  done();
};

export default plugin;
