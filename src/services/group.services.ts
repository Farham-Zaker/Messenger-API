import prismaServices from "../prisma/prismaServices";
import {
  CreateGroupParametersTypes,
  GroupTypes,
} from "../types/groupServices.types";

class GroupServices {
  async create(data: CreateGroupParametersTypes): Promise<GroupTypes> {
    const group: GroupTypes = await prismaServices.groups.create({
      data
    });
    return group;
  }
}
export default GroupServices;
