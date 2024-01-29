import prismaServices from "../prisma/prismaServices";
import {
  CreateChannelParametersTypes,
  CreatedChannelTypes,
} from "../types/channelServices.types";
import databaseSelector from "../utils/databaseSelector";

class ChannelServices {
  async create(
    data: CreateChannelParametersTypes
  ): Promise<CreatedChannelTypes> {
    const channel: CreatedChannelTypes = await prismaServices.channels.create({
      data: {
        ...data,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });
    return channel;
  }
}

export default ChannelServices;
