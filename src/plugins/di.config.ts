import { FastifyInstance } from "fastify";
import { fastifyAwilixPlugin, diContainer } from "@fastify/awilix";
import { asClass } from "awilix";
import UserServices from "../services/user.services";
import AreaCodeServices from "../services/areaCode.services";
import privateChatServices from "../services/privateChat.services";
import messageServices from "../services/message.services";
import GroupServices from "../services/group.services";
import ChannelServices from "../services/channel.services";
import mediaSerives from "../services/media.services";

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
    groupServices: asClass(GroupServices),
    channelServices: asClass(ChannelServices),
    mediaServices: asClass(mediaSerives)
  });
};

export default diConfig;
