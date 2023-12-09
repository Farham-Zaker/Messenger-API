import { FastifyInstance } from "fastify";
import { fastifyAwilixPlugin, diContainer } from "@fastify/awilix";
import { asClass } from "awilix";
import UserServices from "../services/user.services";
const diConfig = (fastify: FastifyInstance) => {
  fastify.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
  });

  diContainer.register({
    userServices: asClass(UserServices),
  });
};

export default diConfig;
