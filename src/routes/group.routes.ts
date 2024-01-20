import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
import validate from "../middlewares/validation.middleware";
import {
  addAdminSchema,
  addMemberToGroupSchema,
  createGroupSchema,
  getAdminByIdSchema,
  getAllGroupAdminsSchema,
  getAllGroupMembersSchema,
  getAllGroupsSchema,
  getGroupById,
  getOneMemberSchema,
  updateGroupSchema,
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
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getAllGroupsSchema }),
    ],
    handler: groupControllers.getGroups,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-admins",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getAllGroupAdminsSchema }),
    ],
    handler: groupControllers.getAdmins,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-members",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getAllGroupMembersSchema }),
    ],
    handler: groupControllers.getMembers,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-groups/:groupId",
    method: "GET",
    preHandler: [isLogged, validate({ target: "query", schema: getGroupById })],
    handler: () => {},
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-one-admin",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getAdminByIdSchema }),
    ],
    handler: groupControllers.getOneAdmin,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-one-member",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getOneMemberSchema }),
    ],
    handler: groupControllers.getOneMember,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/update",
    method: "PUT",
    preHandler: [
      isLogged,
      isGroupAdminOrOwner,
      validate({ target: "body", schema: updateGroupSchema }),
    ],
    handler: groupControllers.updateGroup,
    schema: {
      hide: true,
    },
  });
  done();
};

export default groupRoutesPlugin;
