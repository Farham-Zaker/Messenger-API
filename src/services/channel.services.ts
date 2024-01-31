import prismaServices from "../prisma/prismaServices";
import {
  ChannelAdminTypes,
  ChannelTypes,
  CreateChannelParametersTypes,
  CreatedChannelTypes,
  AddAdminParametersTypes,
  AddMemberParametersTypes,
  FindOneChannelParametersTypes,
  FindOneChannelQueryConditionTypes,
  FindOneChannelAdminParametersTypes,
  ChannelMemberTypes,
  FindOneMemberParametersTypes,
  UpdateChannelParametersTypes,
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
  async addAdmin(data: AddAdminParametersTypes): Promise<ChannelAdminTypes> {
    const addedAdminTypes = await prismaServices.channels_admins.create({
      data,
    });
    return addedAdminTypes;
  }
  async addMember(data: AddMemberParametersTypes): Promise<ChannelMemberTypes> {
    const channelMember: ChannelMemberTypes =
      await prismaServices.channels_members.create({
        data,
      });
    return channelMember;
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
  async findOneChannelAdmin({
    condition,
    selectedFields,
  }: FindOneChannelAdminParametersTypes) {
    const channelAdmin = await prismaServices.channels_admins.findFirst({
      where: condition,
      select: databaseSelector("channels_admins", selectedFields),
    });
    return channelAdmin;
  }
  async findOneChannelMember({
    condition,
    selectedFields,
  }: FindOneMemberParametersTypes): Promise<ChannelMemberTypes | null> {
    const channelMember: ChannelMemberTypes | null =
      await prismaServices.channels_members.findFirst({
        where: condition,
        select: databaseSelector("channels_members", selectedFields),
      });
    return channelMember;
  }
  async updateChannel({
    condition,
    data,
  }: UpdateChannelParametersTypes): Promise<ChannelTypes> {
    const updatedChannel: ChannelTypes = await prismaServices.channels.update({
      data,
      where: condition,
    });
    return updatedChannel;
  }
}

export default ChannelServices;
