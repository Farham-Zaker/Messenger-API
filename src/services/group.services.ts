import prismaServices from "../prisma/prismaServices";
import {
  CreateGroupParametersTypes,
  CreatedGroupTypes,
  GroupTypes,
  FindOneGroupParametersTypes,
  AddMemberToGroupParamtersTyps,
  FindOneGroupMemberParametersTypes,
  GroupMemberTypes,
  AddAdmiToGroupParametersTypes,
  GroupAdminTypes,
  FindOneGroupAdminParamtersTypes,
} from "../types/groupServices.types";
import databaseSelector from "../utils/databaseSelector";

class GroupServices {
  async create(data: CreateGroupParametersTypes): Promise<CreatedGroupTypes> {
    const group: CreatedGroupTypes = await prismaServices.groups.create({
      data,
    });
    return group;
  }
  async addAdmin(
    data: AddAdmiToGroupParametersTypes
  ): Promise<GroupAdminTypes> {
    const admin: GroupAdminTypes = await prismaServices.groups_admins.create({
      data,
    });
    return admin;
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
  async findOneGroupAdmin({
    condition,
    selectedFields,
  }: FindOneGroupAdminParamtersTypes) {
    const admin: GroupAdminTypes | null =
      await prismaServices.groups_admins.findFirst({
        where: condition,
      });
    return admin;
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
