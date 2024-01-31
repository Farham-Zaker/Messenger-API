import { FastifyPluginCallback } from "fastify";
import validate from "../middlewares/validation.middleware";
import isLogged from "../middlewares/islogged";
import isChannelOwner from "../middlewares/channel/isChannelOwner";
import {
  createChannelShcema,
  addAdminSchema,
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
    handler: () => {},
    schema: {
      hide: true,
    },
  });
};

export default channelRoutesPlugin;
