import { FastifyPluginCallback } from "fastify";
import isLogged from "../middlewares/islogged";
const messageRoutesPlugin: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  done();
};

export default messageRoutesPlugin;
