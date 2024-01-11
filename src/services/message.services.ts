import { Prisma } from "@prisma/client";
import prismaServices from "../prisma/prismaServices";
import databaseSelector from "../utils/databaseSelector";
import {
  CreateMessageParametersTypes,
  FindAllMessageParametersTypes,
  FindOneMessageParametersTypes,
  MessageTypes,
  UpdateMessageParametersTypes,
} from "../types/messageServices.types";

class messageServices {
  async create(data: CreateMessageParametersTypes): Promise<MessageTypes> {
    const message: MessageTypes = await prismaServices.messages.create({
      data,
    });
    return message;
  }
  async findAll({
    condition,
    take,
    selectedFields,
  }: FindAllMessageParametersTypes): Promise<MessageTypes[]> {
    const messages: MessageTypes[] = await prismaServices.messages.findMany({
      where: condition,
      take,
      select: databaseSelector("messages", selectedFields),
    });
    return messages;
  }
  async findOne({
    condition,
    selectedFields,
  }: FindOneMessageParametersTypes): Promise<MessageTypes | null> {
    const message: MessageTypes | null =
      await prismaServices.messages.findFirst({
        where: condition,
        select: databaseSelector("messages", selectedFields),
      });
    return message;
  }
  async update({
    data,
    condition,
  }: UpdateMessageParametersTypes): Promise<MessageTypes> {
    const updatedData = await prismaServices.messages.update({
      where: condition,
      data,
    });
    return updatedData;
  }
  async delete(condition: Prisma.messagesWhereInput): Promise<void> {
    await prismaServices.messages.deleteMany({
      where: condition,
    });
  }
}

export default messageServices;
