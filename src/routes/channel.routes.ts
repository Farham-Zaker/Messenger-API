import { FastifyPluginCallback } from "fastify";
import validate from "../middlewares/validation.middleware";
import isLogged from "../middlewares/islogged";
import isChannelOwner from "../middlewares/channel/isChannelOwner";
import {
  createChannelShcema,
  addAdminSchema,
  getAllChannelsSchema,
} from "../schemas/channel.schemas";
import channelControllers from "../controllers/channel.controllers";
import isChannelOrOwnerOrAdmin from "../middlewares/channel/isChannelOwnerOrAdmin";
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
    preHandler: [isLogged, isChannelOrOwnerOrAdmin],
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
      validate({ target: "query", schema: getAllChannelsSchema }),
    ],
    handler: channelControllers.getAllChannels,
    schema: {
      hide: true,
    },
  });
  fastify.route({
    url: "/get-admins",
    method: "GET",
    preHandler: [isLogged],
    handler: () => {},
  });
};

export default channelRoutesPlugin;
