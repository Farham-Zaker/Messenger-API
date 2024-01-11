import { FastifyReply, FastifyRequest } from "fastify";
import {
  SendMessageBodyRequest,
} from "../types/messageControllers.types";
import messageServices from "../services/message.services";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";

export default new (class MessageControllers {
  async sendMessageSchema(
    request: FastifyRequest<{ Body: SendMessageBodyRequest }>,
    reply: FastifyReply
  ) {
    const { text, createdAt, updatedAt } = request.body;

    const messageServices: messageServices =
      request.diScope.resolve("messageServices");

    try {
      await messageServices.create({
        text,
        createdAt,
        updatedAt,
        senderId: request.user?.userId as string,
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "The message sent successfully.",
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
})();
