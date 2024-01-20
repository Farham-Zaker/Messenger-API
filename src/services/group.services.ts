import prismaServices from "../prisma/prismaServices";
import {
  CreateGroupParametersTypes,
  CreatedGroupTypes,
  GroupTypes,
  FindOneGroupParametersTypes,
  FindAllGroupsPramatersTypes,
  FindAllGroupsConditionTypes,
  AddMemberToGroupParamtersTyps,
  FindOneGroupMemberParametersTypes,
  GroupMemberTypes,
  AddAdmiToGroupParametersTypes,
  GroupAdminTypes,
  FindOneGroupAdminParamtersTypes,
  FindAllGroupsAdminsParametersTypes,
  FindAllGroupsMembersParametersTypes,
  UpdateGroupPramatersTypes,
} from "../types/groupServices.types";
import databaseSelector from "../utils/databaseSelector";
import prismaWhereInputExtractor from "../utils/prismaWhereInputExtractor";

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
  async findAllGroups({
    condition,
    selectedFields,
  }: FindAllGroupsPramatersTypes): Promise<GroupTypes[]> {
    const groups = await prismaServices.groups.findMany({
      where: prismaWhereInputExtractor<FindAllGroupsConditionTypes>(condition),
      select: databaseSelector("groups", selectedFields),
    });
    return groups;
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
  async findAllGroupAdmins({
    condition,
    selectedFields,
  }: FindAllGroupsAdminsParametersTypes): Promise<GroupAdminTypes[]> {
    const admins = await prismaServices.groups_admins.findMany({
      where: prismaWhereInputExtractor(condition),
      select: databaseSelector("admins", selectedFields),
    });
    return admins;
  }
  async findOneGroupAdmin({
    condition,
    selectedFields,
  }: FindOneGroupAdminParamtersTypes): Promise<GroupTypes | null> {
    const admin: GroupAdminTypes | null =
      await prismaServices.groups_admins.findFirst({
        where: condition,
        select: databaseSelector("groups_admins", selectedFields),
      });
    return admin;
  }
  async findAllGroupMembers({
    condition,
    selectedFields,
  }: FindAllGroupsMembersParametersTypes): Promise<GroupMemberTypes[]> {
    const members: GroupMemberTypes[] =
      await prismaServices.groups_members.findMany({
        where: condition,
        select: databaseSelector("groups_members", selectedFields),
      });
    return members;
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
  async updateGroup({
    condition,
    data,
  }: UpdateGroupPramatersTypes): Promise<GroupTypes> {
    const updatedGroup: GroupTypes = await prismaServices.groups.update({
      where: condition,
      data,
    });
    return updatedGroup;
  }
}
export default GroupServices;
