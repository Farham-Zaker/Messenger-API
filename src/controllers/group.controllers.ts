import { FastifyReply, FastifyRequest } from "fastify";
import {
  AddAdminBodyRequestTypes,
  GroupTypes,
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
      const group: GroupTypes = await groupServices.create({
        title,
        bio,
        ownerId: user?.userId,
        imagePath,
        updatedAt: new Date(),
      });
      await groupServices.addMember({
        groupId: group.groupId as string,
        userId: user?.userId,
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
  async addAdmin(
    request: FastifyRequest<{ Body: AddAdminBodyRequestTypes }>,
    reply: FastifyReply
  ) {
    const { userId, groupId } = request.body;
    const user = request.user;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");

    try {
      if (user?.userId === userId) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 403,
          message: "You can not add yourself to admin",
        });
      }

      const isUserAdmin: boolean = !!(await groupServices.findOneGroupAdmin({
        condition: {
          userId,
          groupId,
        },
        selectedFields: {
          groups_admins: ["adminId"],
        },
      }));
      if (isUserAdmin) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 409,
          message: "Desire user is still an admin.",
        });
      }
      await groupServices.addAdmin({ userId, groupId });
      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "Desire user added to admins successfully.",
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
    const user = request.user;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");
    try {
      if (userId == user?.userId) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 403,
          message: "You can not add youself to this group.",
        });
      }
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
          statusCode: 409,
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
