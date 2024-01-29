import { FastifyPluginCallback } from "fastify";
import validate from "../middlewares/validation.middleware";
import isLogged from "../middlewares/islogged";
const channelRoutesPlugin: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {};

export default channelRoutesPlugin;
