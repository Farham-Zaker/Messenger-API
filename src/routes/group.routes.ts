import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import {
  addMemberToGroupSchema,
  createGroupSchema,
} from "../schemas/group.schemas";
import groupControllers from "../controllers/group.controllers";

const groupRoutesPlugin: FastifyPluginCallback = (fastify, option, done) => {
  fastify.route({
    url: "/create",
    method: "POST",
    preHandler: [
      isLogged,
      validate({ target: "body", schema: createGroupSchema }),
    ],
    handler: groupControllers.createGroup,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/add-member",
    method: "POST",
    preHandler: [
      isLogged,
      validate({ target: "body", schema: addMemberToGroupSchema }),
    ],
    schema: {
      hide: true,
    },
  });
  done();
};

export default groupRoutesPlugin;
