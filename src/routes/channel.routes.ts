import { FastifyPluginCallback } from "fastify";
import validate from "../middlewares/validation.middleware";
import isLogged from "../middlewares/islogged";
import isChannelOwner from "../middlewares/channel/isChannelOwner";
import {
  createChannelShcema,
  addAdminSchema,
  getChannelSchema,
  getAllAdminsOrMembersShcema,
  getOneAdminOrMemberSchema,
  updateChannelSchema,
  removeAdminOrMemberSchema,
} from "../schemas/channel.schemas";
import channelControllers from "../controllers/channel.controllers";
import isChannelOwnerOrAdmin from "../middlewares/channel/isChannelOwnerOrAdmin";
const channelRoutesPlugin: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.route({
    url: "/create",
    method: "POST",
    preHandler: [
      isLogged,
      validate({ target: "body", schema: createChannelShcema }),
    ],
    handler: channelControllers.createChannel,
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
      isChannelOwner,
    ],
    handler: channelControllers.addAdmin,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/upload-profile-photo/:channelId",
    method: "POST",
    preHandler: [isLogged, isChannelOwnerOrAdmin],
    handler: channelControllers.uploadProfilePhoto,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/join/:channelId",
    method: "POST",
    preHandler: [isLogged],
    handler: channelControllers.joinToChannel,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-channels",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getChannelSchema }),
    ],
    handler: channelControllers.getAllChannels,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-admins",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getAllAdminsOrMembersShcema }),
    ],
    handler: channelControllers.getAllAdmins,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-members",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getAllAdminsOrMembersShcema }),
    ],
    handler: channelControllers.getAllMembers,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-channels/:channelId",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getChannelSchema }),
    ],
    handler: channelControllers.getChannelById,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-one-admin",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getOneAdminOrMemberSchema }),
    ],
    handler: channelControllers.getOneAdmin,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-one-member",
    method: "GET",
    preHandler: [
      isLogged,
      validate({ target: "query", schema: getOneAdminOrMemberSchema }),
    ],
    handler: channelControllers.getOneMember,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/update",
    method: "PUT",
    preHandler: [
      isLogged,
      isChannelOwnerOrAdmin,
      validate({ target: "body", schema: updateChannelSchema }),
    ],
    handler: channelControllers.update,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/remove-profile-photo/:channelId",
    method: "DELETE",
    preHandler: [isLogged, isChannelOwnerOrAdmin],
    handler: channelControllers.removeProfilePhoto,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/left/:channelId",
    method: "DELETE",
    preHandler: [isLogged],
    handler: channelControllers.leftChannel,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/remove-admin",
    method: "DELETE",
    preHandler: [
      isLogged,
      isChannelOwner,
      validate({ target: "query", schema: removeAdminOrMemberSchema }),
    ],
    handler: channelControllers.removeAdmin,
    schema: {
      hide: true,
    },
  });
};

export default channelRoutesPlugin;
