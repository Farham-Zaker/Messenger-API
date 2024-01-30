import { FastifyReply, FastifyRequest } from "fastify";
import ChannelServices from "../services/channel.services";
import {
  AddAdminRequestBodyTypes,
  CreateChannelRequestBodyTypes,
} from "../types/channelControllers.types";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";

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
})();
