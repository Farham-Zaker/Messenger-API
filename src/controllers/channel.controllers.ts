import { FastifyReply, FastifyRequest } from "fastify";
import ChannelServices from "../services/channel.services";
import { CreateChannelRequestBodyTypes } from "../types/channelControllers.types";
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
})();
