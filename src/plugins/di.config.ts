import { FastifyInstance } from "fastify";
import { fastifyAwilixPlugin, diContainer } from "@fastify/awilix";
import { asClass } from "awilix";
import UserServices from "../services/user.services";
import AreaCodeServices from "../services/areaCode.services";
const diConfig = (fastify: FastifyInstance) => {
  fastify.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
  });

  diContainer.register({
    userServices: asClass(UserServices),
    areaCodeServices: asClass(AreaCodeServices),
  });
};

export default diConfig;