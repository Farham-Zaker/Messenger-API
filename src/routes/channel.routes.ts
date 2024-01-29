import { FastifyPluginCallback } from "fastify";
import validate from "../middlewares/validation.middleware";
import isLogged from "../middlewares/islogged";
import { createChannelShcema } from "../schemas/channel.schemas";
import channelControllers from "../controllers/channel.controllers";
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
  });
};

export default channelRoutesPlugin;
