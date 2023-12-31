import { FastifyInstance } from "fastify";
import { fastifyAwilixPlugin, diContainer } from "@fastify/awilix";
import { asClass } from "awilix";
import UserServices from "../services/user.services";
import AreaCodeServices from "../services/areaCode.services";
import privateChatServices from "../services/privateChat.services";
import messageServices from "../services/message.services";

const diConfig = (fastify: FastifyInstance) => {
  fastify.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
  });

  diContainer.register({
    userServices: asClass(UserServices),
    areaCodeServices: asClass(AreaCodeServices),
    privateChatServices: asClass(privateChatServices),
    messageServices: asClass(messageServices),
  });
};

export default diConfig;
