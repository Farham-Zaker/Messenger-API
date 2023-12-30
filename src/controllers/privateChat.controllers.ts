import { FastifyReply, FastifyRequest } from "fastify";
import sendResponse from "../utils/sendResponse";
import privateChatServices from "../services/privateChat.services";
import sendErrorResponse from "../utils/sendErrorResponse";
import {
  PrivateChatTypes,
  GetAllPrivateChatRequestTypes,
  GetPrivateChatByIdRequestTypes,
} from "../types/privateChatControllers.type";
import getQueryKeys from "../utils/getQueryKeys";

export default new (class privateChatControllers {
  async createChat(
    request: FastifyRequest<{ Body: { partnerUserId: string } }>,
    reply: FastifyReply
  ) {
    const privateChatServices: privateChatServices = request.diScope.resolve(
      "privateChatServices"
    );
    const { partnerUserId } = request.body;

    try {
      const isPrivateChatAvialable: boolean =
        !!(await privateChatServices.findOne({
          condition: {
            OR: [
              {
                user1Id: request.user?.userId,
                user2Id: partnerUserId,
              },
              {
                user2Id: request.user?.userId,
                user1Id: partnerUserId,
              },
            ],
          },
          selectedFields: {
            private_chats: ["privateChatId"],
          },
        }));
      if (isPrivateChatAvialable) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 409,
          message: `There is already a chat between '${request.user?.userId}' and '${partnerUserId}'`,
        });
      }
      await privateChatServices.create({
        user1Id: request.user?.userId,
        user2Id: partnerUserId,
        updatedAt: new Date(),
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "The chat was created.",
      });
    } catch (error) {
      sendErrorResponse(reply, error);
    }
  }
  async getAllPrivateChat(
    request: FastifyRequest<GetAllPrivateChatRequestTypes>,
    reply: FastifyReply
  ) {
    const privateChatServices: privateChatServices = request.diScope.resolve(
      "privateChatServices"
    );
    const selectedFieldsInQuery: string[] = getQueryKeys(request.query);

    try {
      const privateChats: PrivateChatTypes[] =
        await privateChatServices.findAll({
          condition: {
            OR: [
              { user1Id: request.user?.userId },
              { user2Id: request.user?.userId },
            ],
          },
          selectedFields: {
            private_chats: [
              "privateChatId",
              "updatedAt",
              "createdAt",
              ...selectedFieldsInQuery,
            ],
          },
        });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        privateChats,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async getPrivateChatById(
    request: FastifyRequest<GetPrivateChatByIdRequestTypes>,
    reply: FastifyReply
  ) {
    const privateChatServices: privateChatServices = request.diScope.resolve(
      "privateChatServices"
    );
    const privateChatId = request.params?.privateChatId;
    const selectedFieldsInQuery: string[] = getQueryKeys(request.query);

    try {
      const privateChat: PrivateChatTypes | null =
        await privateChatServices.findOne({
          condition: {
            privateChatId,
            OR: [
              { user1Id: request.user?.userId },
              { user1Id: request.user?.userId },
            ],
          },
          selectedFields: {
            private_chats: [
              "privateChatId",
              "updatedAt",
              "createdAt",
              ...selectedFieldsInQuery,
            ],
          },
        });
      if (!privateChat) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "There is no any private chat with such id.",
        });
      }
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        privateChat,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
})();
