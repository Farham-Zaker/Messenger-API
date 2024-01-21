import { preHandlerHookHandler } from "fastify";
import GroupServices from "../../services/group.services";
import sendResponse from "../../utils/sendResponse";
import sendErrorResponse from "../../utils/sendErrorResponse";

type GroupTypes = {
  ownerId?: string;
};
const isGroupOwner: preHandlerHookHandler = async (request, reply, done) => {
  try {
    let groupId: string | undefined;
    if (request.method === "POST" || request.method === "PUT") {
      groupId = (request.body as { groupId?: string })?.groupId;
    }
    if (request.method === "GET" || request.method === "DELETE") {
      groupId = (request.query as { groupId?: string })?.groupId;
    }
    const user = request?.user;
    const groupServices: GroupServices =
      request.diScope.resolve("groupServices");

    const group: GroupTypes | null = await groupServices.findOneGroup({
      condition: {
        groupId,
        ownerId: user?.userId,
      },
      selectedFields: {
        groups: ["ownerId"],
      },
    });
    if (!group) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 404,
        message: "There is no any group with such ID.",
      });
    }
    if (group?.ownerId !== user?.userId) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 400,
        message: "Just owner of this group can acces to this route.",
      });
    }
  } catch (error) {
    return sendErrorResponse(reply, error);
  }
};

export default isGroupOwner;
