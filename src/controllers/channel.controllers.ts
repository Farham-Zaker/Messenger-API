import { FastifyReply, FastifyRequest } from "fastify";
import ChannelServices from "../services/channel.services";
import {
  AddAdminRequestBodyTypes,
  CreateChannelRequestBodyTypes,
  UploadedFileTypes,
  GetAllChannelsRequestQueryTypes,
  ChannelTypes,
  GetAllAdminsORMembersRequestQueryTypes,
  AdminTypes,
  MemberType,
  GetChannelByIdRequestQueryTypes,
  GetOneChannelAdminTypes,
  GetOneChannelMemberTypes,
  UpdateChannelTypes,
  RemoveAdminRequestQueryTypes,
  RemoveMemberRequestQueryTypes,
} from "../types/channelControllers.types";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";
import upload from "../utils/upload";
import getQueryKeys from "../utils/getQueryKeys";
import removeFile from "../utils/removeFile";

export default new (class channelController {
  async createChannel(
    request: FastifyRequest<{ Body: CreateChannelRequestBodyTypes }>,
    reply: FastifyReply
  ) {
    const { title, bio, imagePath } = request.body;
    const user = request.user;
    const channelServices: ChannelServices =
      request.diScope.resolve("channelServices");
    try {
      await channelServices.create({
        title,
        bio,
        ownerId: user?.userId,
        imagePath,
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "The channel created successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async addAdmin(
    request: FastifyRequest<{ Body: AddAdminRequestBodyTypes }>,
    reply: FastifyReply
  ) {
    const { userId, channelId } = request.body;
    const user = request.user;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      // If target user ID is equil to ID of user that is logged in.
      if (user?.userId === userId) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 403,
          message: "You can not add yourself to admin.",
        });
      }

      // Check if target user is member of channel or not.
      const isTargetUserJoinedToChannel: Boolean =
        !!(await channelServices.findOneChannelMember({
          condition: { userId, channelId },
          selectedFields: { channels_members: ["memberId"] },
        }));
      if (!isTargetUserJoinedToChannel) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "Tha terget user is not joined to this channel.",
        });
      }
      // Check if target user is admin of channel or not.
      const isTargetUserAdminOfChannel: boolean =
        !!(await channelServices.findOneChannelAdmin({
          condition: { channelId, userId },
          selectedFields: { channels_admins: ["adminId"] },
        }));
      if (!isTargetUserAdminOfChannel) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 409,
          message: "Tha target user is still admin of this channel.",
        });
      }

      await channelServices.addAdmin({ channelId, userId });
      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "The target user added to admins successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async uploadProfilePhoto(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply
  ) {
    const channelId = request.params.channelId;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");
      const uploadedImage = (await upload({
        request,
        reply,
        uploadType: "single",
        acceptableFormats: ["png", "jpeg", "jpg"],
        uploadFileName: request.params.channelId,
        destination: "./src/uploads",
        category: "channels",
      })) as UploadedFileTypes;

      if (typeof uploadedImage === "object") {
        await channelServices.updateChannel({
          condition: { channelId },
          data: {
            imagePath: uploadedImage.filePath,
          },
        });
        return sendResponse(reply, {
          status: "success",
          statusCode: 200,
          message: "The profile photo uploaded successfully.",
          imageURL: uploadedImage.filePath,
        });
      }
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async joinToChannel(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply
  ) {
    const channelId = request.params.channelId;
    const user = request.user;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");
      // Check if user is joined or not
      const isUserJoinedToChannel: boolean =
        !!(await channelServices.findOneChannelMember({
          condition: { channelId, userId: user?.userId },
          selectedFields: { channels_members: ["memberId"] },
        }));
      if (isUserJoinedToChannel) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 400,
          message: "This user is already joined in channel.",
        });
      }
      // Add member to channel
      await channelServices.addMember({
        channelId,
        userId: user?.userId,
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "The target user joined successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async getAllChannels(
    request: FastifyRequest<{ Querystring: GetAllChannelsRequestQueryTypes }>,
    reply: FastifyReply
  ) {
    const { owner, admins, members } = request.query;
    const user = request.user;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      const queryKeys: string[] = getQueryKeys<GetAllChannelsRequestQueryTypes>(
        request.query
      );
      const channelsSelctedFields: string[] = [
        "channelId",
        "title",
        "bio",
        ...queryKeys,
      ];

      const channels: ChannelTypes[] = await channelServices.findAllChannels({
        condition: {
          members: { userId: user?.userId, relation: "one to many" },
        },
        selectedFields: {
          channels: channelsSelctedFields,
          owner:
            owner === "true"
              ? [
                  "userId",
                  "firstName",
                  "lastName",
                  "username",
                  "email",
                  "phoneNumber",
                  "areaCode",
                ]
              : [],
          admins: admins === "true" ? ["adminId", "user"] : [],
          members: members === "true" ? ["memberId", "user"] : [],
        },
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        channels,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async getAllAdmins(
    request: FastifyRequest<{
      Querystring: GetAllAdminsORMembersRequestQueryTypes;
    }>,
    reply: FastifyReply
  ) {
    const { channelId } = request.query;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      // Get keys of object that was 'true' in request query
      const queryKeys: string[] =
        getQueryKeys<GetAllAdminsORMembersRequestQueryTypes>(request.query);

      const admins: AdminTypes[] = await channelServices.findAllChannelAdmins({
        condition: {
          channelId,
        },
        selectedFields: {
          channels_admins: ["adminId", "channelId", "userId", ...queryKeys],
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
  async getAllMembers(
    request: FastifyRequest<{
      Querystring: GetAllAdminsORMembersRequestQueryTypes;
    }>,
    reply: FastifyReply
  ) {
    const { channelId } = request.query;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      // Get keys of object that was 'true' in request query
      const queryKeys: string[] =
        getQueryKeys<GetAllAdminsORMembersRequestQueryTypes>(request.query);

      const members: MemberType[] = await channelServices.findAllChannelAdmins({
        condition: {
          channelId,
        },
        selectedFields: {
          channels_admins: ["adminId", "channelId", "userId", ...queryKeys],
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
  async getChannelById(
    request: FastifyRequest<{
      Params: { channelId: string };
      Querystring: GetChannelByIdRequestQueryTypes;
    }>,
    reply: FastifyReply
  ) {
    try {
      const { channelId } = request.params;
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      // Get keys of object that was 'true' in request query
      const queryKeys: string[] = getQueryKeys<GetChannelByIdRequestQueryTypes>(
        request.query
      );
      const channel: ChannelTypes | null = await channelServices.findOneChannel(
        {
          condition: {
            channelId,
          },
          selectedFields: {
            channels: ["channelId", ...queryKeys],
          },
        }
      );
      if (!channel) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "There is no any channel with such ID.",
        });
      }
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        channel,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async getOneAdmin(
    request: FastifyRequest<{ Querystring: GetOneChannelAdminTypes }>,
    reply: FastifyReply
  ) {
    const { channelId, userId } = request.query;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      // Get keys of object that was 'true' in request query
      const queryKeys: string[] = getQueryKeys<GetOneChannelAdminTypes>(
        request.query
      );
      const admin: AdminTypes | null =
        await channelServices.findOneChannelAdmin({
          condition: {
            channelId,
            userId,
          },
          selectedFields: {
            channels_admins: ["adminId", "channelId", "userId", ...queryKeys],
          },
        });
      if (!admin) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "There is no any admin with such channel ID and user ID.",
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
    request: FastifyRequest<{ Querystring: GetOneChannelMemberTypes }>,
    reply: FastifyReply
  ) {
    const { channelId, userId } = request.query;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      // Get keys of object that was 'true' in request query
      const queryKeys: string[] = getQueryKeys<GetOneChannelAdminTypes>(
        request.query
      );
      const member: MemberType | null =
        await channelServices.findOneChannelMember({
          condition: {
            channelId,
            userId,
          },
          selectedFields: {
            channels_members: ["memberId", "channelId", "userId", ...queryKeys],
          },
        });
      if (!member) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "There is no any member with such channel ID and user ID.",
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
  async update(
    request: FastifyRequest<{ Body: UpdateChannelTypes }>,
    reply: FastifyReply
  ) {
    const { channelId, title, bio, updatedAt } = request.body;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");
      await channelServices.updateChannel({
        condition: {
          channelId,
        },
        data: {
          title,
          bio,
          updatedAt,
        },
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target channel updated successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async removeProfilePhoto(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply
  ) {
    const { channelId } = request.params;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      removeFile({
        reply,
        directoryPath: "./src/uploads",
        nameStartWith: channelId,
      });

      await channelServices.updateChannel({
        condition: { channelId },
        data: { imagePath: "" },
      });

      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target photo removed successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async leftChannel(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply
  ) {
    const { channelId } = request.params;
    const user = request.user;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      const channel: ChannelTypes | null = await channelServices.findOneChannel(
        {
          condition: {
            channelId,
          },
          selectedFields: {
            channels: ["channelId", "ownerId", "admins", "members"],
          },
        }
      );
      const isUserMemberOfGroup: boolean = !!channel?.members?.find(
        (channel) => {
          return channel.userId === user?.userId;
        }
      );
      const isUserAdmin: boolean = !!channel?.admins?.find((admin) => {
        return admin.userId === user?.userId;
      });
      if (!isUserMemberOfGroup) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 403,
          message: "This user is not member of channel.",
        });
      }

      // Delete channel if owner is just member of channel
      const membersCount: number = channel?.members?.length!;
      if (membersCount === 1) {
        await channelServices.deleteChannel({ channelId });
        return sendResponse(reply, {
          status: "success",
          statusCode: 200,
          message:
            "The target user left this channel and also channel was deleted due to lack of existence of member.",
        });
      }

      const isUserOwner: boolean =
        channel?.ownerId === user?.userId ? true : false;
      const adminsCount: number = channel?.admins?.length!;
      // Check if user is owner
      if (isUserOwner) {
        if (adminsCount > 1) {
          await channelServices.removeAdmin({
            channelId,
            userId: user?.userId,
          });
          await channelServices.removeMember({
            channelId,
            userId: user?.userId,
          });
          // Sort user base on date that was created
          const sortedAdminsBasedOnCreatedDate = channel?.admins?.sort(
            (a, b) => {
              const dateA =
                a.createdAt instanceof Date ? a.createdAt : new Date();
              const dateB =
                b.createdAt instanceof Date ? b.createdAt : new Date();
              return dateA.getTime() - dateB.getTime();
            }
          ) as AdminTypes[];
          // Make oldest admin owner of channel
          await channelServices.updateChannel({
            condition: { channelId },
            data: {
              ownerId: sortedAdminsBasedOnCreatedDate[0].userId,
            },
          });
        } else {
          // Sort member base on date was created
          const sortedMembersBasedOnCreatedDate = channel?.members?.sort(
            (a, b) => {
              const dateA =
                a.createdAt instanceof Date ? a.createdAt : new Date();
              const dateB =
                b.createdAt instanceof Date ? b.createdAt : new Date();
              return dateA.getTime() - dateB.getTime();
            }
          ) as MemberType[];
          await channelServices.updateChannel({
            condition: { channelId },
            data: { ownerId: sortedMembersBasedOnCreatedDate[1].userId },
          });

          await channelServices.removeMember({
            channelId,
            userId: user?.userId,
          });
        }
      }
      // Delete admin and user if user is admin
      else if (isUserAdmin) {
        await channelServices.removeAdmin({ channelId, userId: user?.userId });
        await channelServices.removeMember({ channelId, userId: user?.userId });
      }
      // Delete member if user is just member
      else {
        await channelServices.removeMember({ channelId, userId: user?.userId });
      }

      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target user left this channel.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async removeAdmin(
    request: FastifyRequest<{ Querystring: RemoveAdminRequestQueryTypes }>,
    reply: FastifyReply
  ) {
    const { channelId, userId } = request.query;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      await channelServices.removeAdmin({ channelId, userId });

      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target admin removed successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async removeMember(
    request: FastifyRequest<{ Querystring: RemoveMemberRequestQueryTypes }>,
    reply: FastifyReply
  ) {
    const { channelId, userId } = request.query;
    const user = request.user;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");
      // Check if target user is admin or not
      const isTargetUserAdmin: boolean =
        !!(await channelServices.findOneChannelAdmin({
          condition: {
            channelId,
            userId,
          },
          selectedFields: {
            channels_admins: ["adminId"],
          },
        }));
      // Check if target user is owner or not
      const isTargetUserOwner: boolean =
        !!(await channelServices.findOneChannel({
          condition: {
            channelId,
            ownerId: userId,
          },
          selectedFields: {
            channels: ["channelId"],
          },
        }));
      if (isTargetUserOwner) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 403,
          message: "The owner of channel can not be removed.",
        });
      }
      // Send response if target user ID was equal to logged user ID.
      if (user?.userId === userId) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 400,
          message: "You can not remove yourself.",
        });
      }
      // Check if logged user was owner
      if (user?.role === "owner") {
        await channelServices.removeMember({ channelId, userId });
        // Remove admin if target user was admin
        if (isTargetUserAdmin)
          await channelServices.removeAdmin({ channelId, userId });
      } else if (user?.role === "admin") {
        // Send error response if admin want to delete a admin
        if (isTargetUserAdmin)
          return sendResponse(reply, {
            status: "error",
            statusCode: 400,
            message: "The admin can not be removed by admin.",
          });

        await channelServices.removeMember({ channelId, userId });
      }

      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target user removed successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async deleteChannel(
    request: FastifyRequest<{ Params: { channelId: string } }>,
    reply: FastifyReply
  ) {
    const { channelId } = request.params;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");

      await channelServices.removeAllAdmins({ channelId });
      await channelServices.removeAllMember({ channelId });
      await channelServices.deleteChannel({ channelId });

      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target channel deleted successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
})();
