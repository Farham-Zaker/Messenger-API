import prismaServices from "../prisma/prismaServices";
import {
  ChannelTypes,
  CreateChannelParametersTypes,
  CreatedChannelTypes,
  FindOneChannelParametersTypes,
  FindOneChannelQueryConditionTypes,
} from "../types/channelServices.types";
import databaseSelector from "../utils/databaseSelector";
import prismaWhereInputExtractor from "../utils/prismaWhereInputExtractor";

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
  async findOneChannel({
    condition,
    selectedFields,
  }: FindOneChannelParametersTypes): Promise<ChannelTypes | null> {
    const channel: ChannelTypes | null =
      await prismaServices.channels.findFirst({
        where:
          prismaWhereInputExtractor<FindOneChannelQueryConditionTypes>(
            condition
          ),
        select: databaseSelector("channels", selectedFields),
      });
    return channel;
  }
}

export default ChannelServices;
