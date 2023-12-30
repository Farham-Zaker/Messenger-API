import { FastifyReply, FastifyRequest } from "fastify";
import sendResponse from "../utils/sendResponse";
import privateChatServices from "../services/privateChat.services";
import sendErrorResponse from "../utils/sendErrorResponse";

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
})();
