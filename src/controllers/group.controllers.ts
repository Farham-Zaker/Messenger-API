import { FastifyReply, FastifyRequest } from "fastify";
import {
  AddAdminRequestBodyTypes,
  GroupTypes,
  GroupMemberTypes,
  AddMemberToGroupRequestBodyTypes,
  CreateGroupRequestBodyTypes,
  UploadFileTypes,
  GetAllGroupsRequestQueryTypes,
  GetAdminsRequestQueryTypes,
  GroupAdminTypes,
  GetAllMembersRequestQueryTypes,
  GetGroupByIdRequestParamsTypes,
  GetGroupByIdRequestQueryTypes,
  GetOneGroupAdminRequestQueryRequestTypes,
  GetOneGroupMemberRequestQueryTypes,
  UpdateGroupRequestBodyTypes,
  RemoveAdminRequestQueryTypes,
  RemoveMemberRequestQueryTypes,
} from "../types/groupControllers.types";
import GroupServices from "../services/group.services";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";
import fs from "fs";
import pump from "pump";
import path from "path";
import upload from "../utils/upload";
export default new (class groupControllers {
  async createGroup(
    request: FastifyRequest<{ Body: CreateGroupRequestBodyTypes }>,
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
  async uploadProfilePhoto(
    request: FastifyRequest<{ Params: { groupId: string } }>,
    reply: FastifyReply
  ) {
    const { groupId } = request.params;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");

    try {
      const uploadedFile = await upload({
        request,
        reply,
        uploadType: "single",
        acceptableFormats: ["png", "jpeg", "jpg"],
        destination: "./src/uploads",
        uploadFileName: `${groupId}_profile`,
        category: "groups",
      }) as UploadFileTypes
      await groupServices.updateGroup({
        condition: {
          groupId,
        },
        data: {
          imagePath: uploadedFile?.filePath,
        },
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "The profile photo uploaded successfully.",
        photoPath: uploadedFile?.filePath,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async addAdmin(
    request: FastifyRequest<{ Body: AddAdminRequestBodyTypes }>,
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
          message: "The targer user is still an admin.",
        });
      }
      await groupServices.addAdmin({ userId, groupId });
      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "Ther target user added to admins successfully.",
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
  async addMember(
    request: FastifyRequest<{ Body: AddMemberToGroupRequestBodyTypes }>,
    reply: FastifyReply
  ) {
    const { userId, groupId } = request.body;
    const user = request.user;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");
    try {
      if (userId === user?.userId) {
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
    request: FastifyRequest<{ Querystring: GetAllGroupsRequestQueryTypes }>,
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
            userId: user?.userId,
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
    request: FastifyRequest<{ Querystring: GetAdminsRequestQueryTypes }>,
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
    request: FastifyRequest<{ Querystring: GetAllMembersRequestQueryTypes }>,
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
      Params: GetGroupByIdRequestParamsTypes;
      Querystring: GetGroupByIdRequestQueryTypes;
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
  async getOneAdmin(
    request: FastifyRequest<{
      Querystring: GetOneGroupAdminRequestQueryRequestTypes;
    }>,
    reply: FastifyReply
  ) {
    const { groupId, group, userId, user } = request.query;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");

    try {
      const admin: GroupAdminTypes | null =
        await groupServices.findOneGroupAdmin({
          condition: {
            groupId,
            userId,
          },
          selectedFields: {
            groups_admins: ["adminId", "groupId", "userId"],
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
      if (!admin) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "There is no any admin with such group ID and user ID.",
        });
      }
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        admin,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async getOneMember(
    request: FastifyRequest<{
      Querystring: GetOneGroupMemberRequestQueryTypes;
    }>,
    reply: FastifyReply
  ) {
    const { groupId, userId, group, user } = request.query;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");
    console.log(group === "true" ?? []);
    try {
      const member: GroupMemberTypes | null =
        await groupServices.findOneGroupMember({
          condition: { groupId, userId },
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
      if (!member) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "There is no any member with such user ID and group ID.",
        });
      }
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        member,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async updateGroup(
    request: FastifyRequest<{ Body: UpdateGroupRequestBodyTypes }>,
    reply: FastifyReply
  ) {
    const { groupId, title, bio, imagePath, updatedAt } = request.body;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");
    try {
      await groupServices.updateGroup({
        condition: { groupId },
        data: { title, bio, imagePath, updatedAt },
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target group updated succussfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async removeProfilePhoto(
    request: FastifyRequest<{ Params: { groupId: string } }>,
    reply: FastifyReply
  ) {
    const { groupId } = request.params;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");
    try {
      // Remove file
      const directoryPath: string = "./src/uploads";
      fs.readdir(directoryPath, (error, files) => {
        // Find the file that the name of that start with group ID
        const targetFiles: string[] = files.filter((file) =>
          file.startsWith(groupId)
        );
        if (targetFiles.length === 0) {
          return sendResponse(reply, {
            status: "error",
            statusCode: 404,
            message: "There is no any file with such group ID.",
          });
        }
        // Remove all file that the name of that start with group ID
        targetFiles.forEach((file) => {
          const filePath: string = path.join(directoryPath, file);
          fs.unlink(filePath, (err) => {
            sendErrorResponse(reply, err);
          });
        });
      });
      await groupServices.updateGroup({
        condition: { groupId },
        data: {
          imagePath: "",
        },
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target profile photo removed successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async leftGroup(
    request: FastifyRequest<{ Params: { groupId: string } }>,
    reply: FastifyReply
  ) {
    const { groupId } = request.params;
    const user = request.user;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");
    try {
      const group: GroupTypes | null = await groupServices.findOneGroup({
        condition: {
          groupId,
          members: {
            userId: user?.userId,
            relation: "one to many",
          },
        },
        selectedFields: {
          groups: ["groupId", "ownerId", "admins", "members"],
        },
      });
      if (!group) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "You are not join in group with such group ID.",
        });
      }
      const successResponse = {
        status: "success",
        statusCode: 200,
        message: "Leaving the group was done successfully.",
      };
      // Check is user owner of group by token that sent.
      const isThisUserOwnerOfGroup: boolean = group.ownerId === user?.userId;

      if (isThisUserOwnerOfGroup) {
        // If there is not any admin in group, owner of group will be the oldest member of group.
        if (group.admins?.length === 0) {
          const sortedMembers = group.members?.sort((a, b) => {
            const dateA = a.createdAt as any;
            const dateB = b.createdAt as any;
            return dateA - dateB;
          }) as GroupMemberTypes[];
          const oldestMember: GroupMemberTypes = sortedMembers[0];

          await groupServices.updateGroup({
            condition: { groupId },
            data: { ownerId: oldestMember.userId },
          });
          return sendResponse(reply, successResponse);
        }
        // Check if the user is the oldest member in group.
        const sortedAdmins = group.admins?.sort((a, b) => {
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date();
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date();
          return dateA.getTime() - dateB.getTime();
        }) as GroupAdminTypes[];
        const oldestAdmin: GroupAdminTypes = sortedAdmins[0];

        await groupServices.removeAdmin({
          userId: oldestAdmin.userId as string,
          groupId: groupId,
        });
        await groupServices.updateGroup({
          condition: {
            groupId,
          },
          data: {
            ownerId: oldestAdmin.userId,
          },
        });
        await groupServices.removeMember({
          userId: user?.userId,
          groupId: groupId,
        });
        return sendResponse(reply, successResponse);
      }
      // If the user is admin of group by token that sent.
      const isThisUserAdminOfGroup: boolean = !!group.admins?.find(
        (admin) => admin.userId === user?.userId
      );
      if (isThisUserAdminOfGroup) {
        await groupServices.removeAdmin({ userId: user?.userId, groupId });
        await groupServices.removeMember({ userId: user?.userId, groupId });
        return sendResponse(reply, successResponse);
      }

      // If the user is neither owner nor admin, it is just member
      await groupServices.removeMember({ userId: user?.userId, groupId });
      return sendResponse(reply, successResponse);
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async removeAdmin(
    request: FastifyRequest<{ Querystring: RemoveAdminRequestQueryTypes }>,
    reply: FastifyReply
  ) {
    const { groupId, userId } = request.query;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");

    try {
      await groupServices.removeAdmin({ groupId, userId });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target group deleted successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async removeMember(
    request: FastifyRequest<{ Querystring: RemoveMemberRequestQueryTypes }>,
    reply: FastifyReply
  ) {
    const { groupId, userId } = request.query;
    const user = request.user;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");

    try {
      const isTargetUserOwnerOfGroup: boolean =
        !!(await groupServices.findOneGroup({
          condition: {
            groupId,
            ownerId: userId,
          },
          selectedFields: {
            groups: ["groupId"],
          },
        }));
      if (isTargetUserOwnerOfGroup) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 403,
          message: "The owner of group can not be removed.",
        });
      }

      if (user?.role === "owner") {
        await groupServices.removeMember({ groupId, userId });
        await groupServices.removeAdmin({ groupId, userId });
        return sendResponse(reply, {
          status: "success",
          statusCode: 200,
          message: "The target user removed successfully.",
        });
      }
      if (user?.role === "admin") {
        const isTargetUserAdmin: boolean =
          !!(await groupServices.findOneGroupAdmin({
            condition: {
              userId,
            },
            selectedFields: {
              groups_admins: ["adminId"],
            },
          }));
        if (isTargetUserAdmin) {
          return sendResponse(reply, {
            status: "error",
            statusCode: 400,
            message: "Admin just can remove memebers that are not admin.",
          });
        }
        await groupServices.removeMember({ groupId, userId });
        await groupServices.removeAdmin({ groupId, userId });
        return sendResponse(reply, {
          status: "success",
          statusCode: 200,
          message: "The targer user removed successfully.",
        });
      }
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async deleteGroup(
    request: FastifyRequest<{ Params: { groupId: string } }>,
    reply: FastifyReply
  ) {
    const { groupId } = request.params;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");

    try {
      await groupServices.removeAllAdmins({ groupId });
      await groupServices.removeAllMembers({ groupId });
      await groupServices.deleteGroup({ groupId });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target group deleted successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
})();
