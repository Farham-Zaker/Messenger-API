import { FastifyPluginCallback } from "fastify";
import validate from "../middlewares/validation.middleware";
import isLogged from "../middlewares/islogged";
import isChannelOwner from "../middlewares/channel/isChannelOwner";
import { createChannelShcema } from "../schemas/channel.schemas";
import channelControllers from "../controllers/channel.controllers";
import { addAdminSchema } from "../schemas/group.schemas";
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
};

export default channelRoutesPlugin;
