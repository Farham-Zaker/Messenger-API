import { Prisma } from "@prisma/client";
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
  async findOneGroupAdmin({
    condition,
    selectedFields,
  }: FindOneGroupAdminParamtersTypes) {
    const admin: GroupAdminTypes | null =
      await prismaServices.groups_admins.findFirst({
        where: condition,
        select: databaseSelector("groups_admins", selectedFields),
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
