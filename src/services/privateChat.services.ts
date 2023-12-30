import { Prisma } from "@prisma/client";
import prismaServices from "../prisma/prismaServices";
import {
  CreatePrivateChatParametersType,
  CreatePrivateChatTypes,
  FindAllPrivateChatsParametersType,
  PrivateChatFindOneParametersTypes,
  PrivateChatFindOneTypes,
  PrivateChatTypes,
  UpdatePrivateChatParametersType,
} from "../types/privateChatSercices.types";
import databaseSelector from "../utils/databaseSelector";

class privateChatServices {
  async findOne({
    condition,
    selectedFields,
  }: PrivateChatFindOneParametersTypes) {
    const privateChat: PrivateChatFindOneTypes | null =
      await prismaServices.private_chats.findFirst({
        where: condition,
        select: databaseSelector("private_chats", selectedFields),
      });
    return privateChat;
  }
  async create(
    data: CreatePrivateChatParametersType
  ): Promise<CreatePrivateChatTypes> {
    const createdPrivateChat: CreatePrivateChatTypes | null =
      await prismaServices.private_chats.create({
        data,
      });
    return createdPrivateChat;
  }
  async findAll({
    condition,
    selectedFields,
  }: FindAllPrivateChatsParametersType): Promise<PrivateChatTypes[]> {
    const privateChats: PrivateChatTypes[] =
      await prismaServices.private_chats.findMany({
        where: condition,
        select: databaseSelector("private_chats", selectedFields),
      });
    return privateChats;
  }
  async update({ data, condition }: UpdatePrivateChatParametersType) {
    const privateChat: PrivateChatTypes =
      await prismaServices.private_chats.update({
        data,
        where: condition,
      });
    return privateChat;
  }
  async delete(condition: Prisma.private_chatsWhereInput): Promise<void> {
    await prismaServices.private_chats.deleteMany({
      where: condition,
    });
  }
}

export default privateChatServices;
