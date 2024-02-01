import { FastifyReply, FastifyRequest } from "fastify";
import ChannelServices from "../services/channel.services";
import {
  AddAdminRequestBodyTypes,
  CreateChannelRequestBodyTypes,
  GetAllChannelsRequestQueryTypes,
  ChannelTypes,
  GetAllAdminsRequestQueryTypes,
  AdminTypes,
} from "../types/channelControllers.types";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";
import upload from "../utils/upload";
import getQueryKeys from "../utils/getQueryKeys";

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
      const uploadedImage = await upload({
        request,
        reply,
        acceptableFormats: ["png", "jpeg", "jpg"],
        desiredName: request.params.channelId,
        uploadDestination: "./src/uploads",
      });
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
    request: FastifyRequest<{ Querystring: GetAllAdminsRequestQueryTypes }>,
    reply: FastifyReply
  ) {
    const { channelId } = request.query;
    try {
      const channelServices: ChannelServices =
        request.diScope.resolve("channelServices");
      const queryKeys: string[] = getQueryKeys<GetAllAdminsRequestQueryTypes>(
        request.query
      );
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
})();
