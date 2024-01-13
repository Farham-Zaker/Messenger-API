import { FastifyPluginCallback } from "fastify";
import groupControllers from "../controllers/group.controllers";

const groupRoutesPlugin: FastifyPluginCallback = (fastify, option, done) => {
  fastify.route({
    url: "/create",
    method: "POST",
  });
  done();
};

export default groupRoutesPlugin;
