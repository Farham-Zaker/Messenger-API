import { FastifyReply, FastifyRequest } from "fastify";
import {
  AddAdminBodyRequestTypes,
  GroupTypes,
  AddMemberToGroupBodyRequestTyps,
  CreateGroupBodyRequestTypes,
  GetAllGroupsQueryTypes,
  GetAdminsQueryRequestTypes,
  GroupAdminTypes,
  GetAllMembersQueryRequestTypes,
  GetGroupByIdParamsRequestTypes,
  GetGroupByIdQueryRequestTypes,
} from "../types/groupControllers.types";
import GroupServices from "../services/group.services";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";
import { GroupMemberTypes } from "../types/groupServices.types";

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
  async getGroups(
    request: FastifyRequest<{ Querystring: GetAllGroupsQueryTypes }>,
    reply: FastifyReply
  ) {
    const { owner } = request.query;
    const user = request.user;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");
    try {
      const groups: GroupTypes[] = await groupServices.findAllGroups({
        condition: {
          members: {
            memberId: user?.userId,
            relation: "one to many",
          },
        },
        selectedFields: {
          groups: [
            "groupId",
            "title",
            "bio",
            "imagePath",
            "ownerId",
            "updatedAt",
            "createdAt",
          ],
          owner:
            owner === "true"
              ? [
                  "userId",
                  "username",
                  "firstName",
                  "lastName",
                  "areaCodeId",
                  "phoneNumber",
                  "email",
                ]
              : [],
        },
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        groups,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async getAdmins(
    request: FastifyRequest<{ Querystring: GetAdminsQueryRequestTypes }>,
    reply: FastifyReply
  ) {
    const { groupId, group, user } = request.query;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");

    try {
      const admins: GroupAdminTypes[] = await groupServices.findAllGroupAdmins({
        condition: {
          groupId,
        },
        selectedFields: {
          admins: ["adminId", "userId", "groupId"],
          group:
            group === "true"
              ? [
                  "groupId",
                  "title",
                  "bio",
                  "imagePath",
                  "ownerId",
                  "updatedAt",
                  "createdAt",
                ]
              : [],
          user:
            user === "true"
              ? [
                  "userId",
                  "firstName",
                  "lastName",
                  "username",
                  "areaCodeId",
                  "phoneNumber",
                  "email",
                ]
              : [],
        },
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        admins,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async getMembers(
    request: FastifyRequest<{ Querystring: GetAllMembersQueryRequestTypes }>,
    reply: FastifyReply
  ) {
    const { groupId, group, user } = request.query;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");

    try {
      const members: GroupMemberTypes[] =
        await groupServices.findAllGroupMembers({
          condition: {
            groupId,
          },
          selectedFields: {
            groups_members: ["memberId", "groupId", "userId"],
            group:
              group === "true"
                ? [
                    "groupId",
                    "title",
                    "bio",
                    "imagePath",
                    "ownerId",
                    "updatedAt",
                    "createdAt",
                  ]
                : [],
            user:
              user === "true"
                ? [
                    "userId",
                    "firstName",
                    "lastName",
                    "username",
                    "areaCodeId",
                    "phoneNumber",
                    "email",
                  ]
                : [],
          },
        });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        members,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async getGroupById(
    request: FastifyRequest<{
      Params: GetGroupByIdParamsRequestTypes;
      Querystring: GetGroupByIdQueryRequestTypes;
    }>,
    reply: FastifyReply
  ) {
    const { groupId } = request.params;
    const { owner, admins, members, messages } = request.query;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");
    try {
      const group: GroupTypes | null = await groupServices.findOneGroup({
        condition: {
          groupId,
        },
        selectedFields: {
          groups: [
            "groupId",
            "title",
            "bio",
            "imagePath",
            "ownerId",
            "updatedAt",
            "createdAt",
          ],
          owner:
            owner === "true"
              ? [
                  "userId",
                  "username",
                  "firstName",
                  "lastName",
                  "areaCodeId",
                  "phoneNumber",
                  "email",
                ]
              : [],
          admins: admins === "true" ? ["adminId", "user"] : [],
          members: members === "true" ? ["memberId", "user"] : [],
          messages:
            messages === "true"
              ? [
                  "messageId",
                  "text",
                  "senderId",
                  "replyOf",
                  "updatedAt",
                  "createdAt",
                ]
              : [],
        },
      });
      if (!group) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "There is no any group with such ID.",
        });
      }
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        group,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
})();
