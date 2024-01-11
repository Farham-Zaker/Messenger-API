import { FastifyReply, FastifyRequest } from "fastify";
import {
  MessageTypes,
  SendMessageBodyRequest,
  GetMessageQueryTypes,
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
  async getAllMessages(
    request: FastifyRequest<{ Querystring: GetMessageQueryTypes }>,
    reply: FastifyReply
  ) {
    const messageServices: messageServices =
      request.diScope.resolve("messageServices");

    const {
      privateChatId,
      groupId,
      channelId,
      sender,
      media,
      privateChat,
      channel,
      group,
      searchTerm,
      take,
    } = request.query;
    try {
      const messages: MessageTypes[] = await messageServices.findAll({
        condition: {
          privateChatId,
          groupId,
          channelId,
          text: {
            contains: searchTerm,
          },
        },
        take: Number(take) || 50,
        selectedFields: {
          messages: [
            "messageId",
            "text",
            "senderId",
            "replyOf",
            "createdAt",
            "updatedAt",
            "mediaId",
            "privateChatId",
            "groupId",
            "channelId",
          ],
          sender:
            sender == "true"
              ? ["userId", "firstName", "lastName", "username"]
              : [],
          media: media == "true" ? ["mediaId", "filePath", "fileType"] : [],
          privateChat:
            privateChat === "true"
              ? ["privateChatId", "user1Id", "user2Id", "createdAt"]
              : [],
          channel:
            channel === "true"
              ? [
                  "channelId",
                  "title",
                  "bio",
                  "ownerId",
                  "imagePath",
                  "updatedAt",
                  "createdAt",
                ]
              : [],
          group:
            group === "true"
              ? [
                  "groupId",
                  "title",
                  "bio",
                  "ownerId",
                  "imagePath",
                  "updatedAt",
                  "createdAt",
                ]
              : [],
        },
      });

      sendResponse(reply, {
        status: "success",
        statusCode: 200,
        messages,
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
})();
