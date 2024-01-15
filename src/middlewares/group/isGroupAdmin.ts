import { preHandlerHookHandler } from "fastify";
import GroupServices from "../../services/group.services";
import sendResponse from "../../utils/sendResponse";
import sendErrorResponse from "../../utils/sendErrorResponse";

type BodyTypes = {
  userId: string;
  groupId: string;
};
const isGroupAdmin: preHandlerHookHandler = async (request, reply, done) => {
  const { userId, groupId } = request.body as BodyTypes;
  const groupServices: GroupServices = request.diScope.resolve("userServices");
  try {
    const group: boolean = !!(await groupServices.findOneGroupAdmin({
      condition: { userId, groupId },
      selectedFields: { groups_admins: ["adminId"] },
    }));
    if (!group) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 403,
        message: "Just group admin can access to this route.",
      });
    }
  } catch (error) {
    return sendErrorResponse(reply, error);
  }
};

export default isGroupAdmin;
