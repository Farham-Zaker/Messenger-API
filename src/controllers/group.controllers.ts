import { FastifyReply, FastifyRequest } from "fastify";
import {
  AddMemberToGroupBodyRequestTyps,
  CreateGroupBodyRequestTypes,
} from "../types/groupControllers.types";
import GroupServices from "../services/group.services";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";

export default new (class groupControllers {
  async createGroup(
    request: FastifyRequest<{ Body: CreateGroupBodyRequestTypes }>,
    reply: FastifyReply
  ) {
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");

    const { title, bio, imagePath } = request.body;
    const user = request.user;
    try {
      await groupServices.create({
        title,
        bio,
        ownerId: user?.userId,
        imagePath,
        updatedAt: new Date(),
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "The group created successfully.",
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
  async addMember(
    request: FastifyRequest<{ Body: AddMemberToGroupBodyRequestTyps }>,
    reply: FastifyReply
  ) {
    const { userId, groupId } = request.body;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");
    try {
      const groupMember: boolean = !!(await groupServices.findOneGroupMember({
        condition: {
          userId,
          groupId,
        },
        selectedFields: {
          groups_members: ["memberId"],
        },
      }));

      if (groupMember) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 403,
          message: "There is an member with such ID in the group with such ID.",
        });
      }

      await groupServices.addMember({
        groupId,
        userId,
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "Desire user added to this group.",
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
})();
