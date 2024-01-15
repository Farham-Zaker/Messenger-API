import { preHandlerHookHandler } from "fastify";
import GroupServices from "../../services/group.services";
import sendResponse from "../../utils/sendResponse";
import sendErrorResponse from "../../utils/sendErrorResponse";

type BodyTypes = {
  userId: string;
  groupId: string;
};
type GroupTypes = {
  ownerId?: string;
};
const isGroupOwner: preHandlerHookHandler = async (request, reply, done) => {
  const { groupId } = request.body as BodyTypes;
  const user = request?.user;
  const groupServices: GroupServices = request.diScope.resolve("groupServices");
  try {
    const group: GroupTypes | null = await groupServices.findOneGroup({
      condition: {
        groupId,
        ownerId: user?.userId,
      },
      selectedFields: {
        groups: ["ownerId"],
      },
    });
    if (group?.ownerId !== user?.userId) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 400,
        message: "Just owner of this group can acces to this route.",
      });
    }
    return done();
  } catch (error) {
    return sendErrorResponse(reply, error);
  }
};

export default isGroupOwner;
