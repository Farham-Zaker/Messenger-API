import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import {
  addAdminSchema,
  addMemberToGroupSchema,
  createGroupSchema,
} from "../schemas/group.schemas";
import groupControllers from "../controllers/group.controllers";
import isGroupOwner from "../middlewares/group/isGroupOwner";
import isGroupAdminOrOwner from "../middlewares/group/isGroupAdminOrOwner";

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
    url: "/add-admin",
    method: "POST",
    preHandler: [
      isLogged,
      validate({ target: "body", schema: addAdminSchema }),
      isGroupOwner,
    ],
    handler: groupControllers.addAdmin,
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
      isGroupAdminOrOwner,
    ],
    handler: groupControllers.addMember,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-groups",
    method: "GET",
    preHandler: [isLogged],
    handler: () => {},
  });
  done();
};

export default groupRoutesPlugin;
