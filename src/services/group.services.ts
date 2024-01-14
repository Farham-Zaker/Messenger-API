import prismaServices from "../prisma/prismaServices";
import {
  CreateGroupParametersTypes,
  GroupTypes,
  FindOneGroupParametersTypes,
  AddMemberToGroupParamtersTyps,
  FindOneGroupMemberParametersTypes,
  GroupMemberTypes,
} from "../types/groupServices.types";
import databaseSelector from "../utils/databaseSelector";

class GroupServices {
  async create(data: CreateGroupParametersTypes): Promise<GroupTypes> {
    const group: GroupTypes = await prismaServices.groups.create({
      data,
    });
    return group;
  }
  async addMember(
    data: AddMemberToGroupParamtersTyps
  ): Promise<GroupMemberTypes> {
    const groupMember: GroupMemberTypes =
      await prismaServices.groups_members.create({
        data,
      });
    return groupMember;
  }
  async findOneGroup({
    condition,
    selectedFields,
  }: FindOneGroupParametersTypes): Promise<GroupTypes | null> {
    const group: GroupTypes | null = await prismaServices.groups.findFirst({
      where: condition,
      select: databaseSelector("groups", selectedFields),
    });
    return group;
  }
  async findOneGroupMember({
    condition,
    selectedFields,
  }: FindOneGroupMemberParametersTypes): Promise<GroupMemberTypes | null> {
    const groupMember: GroupMemberTypes | null =
      await prismaServices.groups_members.findFirst({
        where: condition,
        select: databaseSelector("groups_members", selectedFields),
      });
    return groupMember;
  }
}
export default GroupServices;
