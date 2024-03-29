import { FastifyReply, FastifyRequest } from "fastify";
import {
  MessageTypes,
  SendMessageBodyRequest,
  GetMessageQueryTypes,
  UpdateMessageBodyTypes,
} from "../types/messageControllers.types";
import messageServices from "../services/message.services";
import sendResponse from "../utils/sendResponse";
import sendErrorResponse from "../utils/sendErrorResponse";

export default new (class MessageControllers {
  async sendMessageSchema(
    request: FastifyRequest<{ Body: SendMessageBodyRequest }>,
    reply: FastifyReply
  ) {
    const { text, createdAt, updatedAt, privateChatId, groupId, channelId } =
      request.body;

    const messageServices: messageServices =
      request.diScope.resolve("messageServices");

    try {
      await messageServices.create({
        privateChatId,
        groupId,
        channelId,
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
  async getMessageById(
    request: FastifyRequest<{
      Querystring: GetMessageQueryTypes;
      Params: { messageId: string };
    }>,
    reply: FastifyReply
  ) {
    const messageServices: messageServices =
      request.diScope.resolve("messageServices");
    const { sender, media, privateChat, channel, group } = request.query;
    const { messageId } = request.params;
    try {
      const message: MessageTypes | null = await messageServices.findOne({
        condition: {
          messageId,
        },
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
      if (!message) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "There is no any message with such ID.",
        });
      }
      sendResponse(reply, {
        status: "success",
        statusCode: 200,
        messageDate: message,
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
  async updateMessage(
    request: FastifyRequest<{ Body: UpdateMessageBodyTypes }>,
    reply: FastifyReply
  ) {
    const { messageId, text, replyOf, updatedAt } = request.body;

    const messageServices: messageServices =
      request.diScope.resolve("messageServices");
    try {
      await messageServices.update({
        condition: {
          messageId,
        },
        data: {
          text,
          replyOf,
          updatedAt,
        },
      });
      sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "Desire message updated successfully.",
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
  async deleteMessage(
    request: FastifyRequest<{ Params: { messageId: string } }>,
    reply: FastifyReply
  ) {
    const { messageId } = request.params;

    const messageServices: messageServices =
      request.diScope.resolve("messageServices");

    try {
      await messageServices.delete({ messageId });
      sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "Desire message deleted successfully.",
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
})();
