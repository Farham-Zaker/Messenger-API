import { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";
import diConfig from "./di.config";
import swaggerConfig from "./swagger.config";
const plugins = (server: FastifyInstance) => {
  diConfig(server);
  swaggerConfig(server);
  server.register(multipart);
};

export default plugins;
