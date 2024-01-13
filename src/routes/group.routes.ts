import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import { createGroupSchmea } from "../schemas/group.schemas";

const groupRoutesPlugin: FastifyPluginCallback = (fastify, option, done) => {
  fastify.route({
    url: "/create",
    method: "POST",
    preHandler: [
      isLogged,
      validate({ target: "body", schema: createGroupSchmea }),
    ],
  });
  done();
};

export default groupRoutesPlugin;
