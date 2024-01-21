import { preHandlerHookHandler } from "fastify";
import GroupServices from "../../services/group.services";
import sendResponse from "../../utils/sendResponse";
import sendErrorResponse from "../../utils/sendErrorResponse";

type GroupTypes = {
  groupId?: string;
  ownerId?: string;
  admins?: AdminTypes[];
};
type AdminTypes = {
  adminId: string;
  groupId: string;
  userId: string;
};
const isGroupAdminOrOwner: preHandlerHookHandler = async (
  request,
  reply,
  done
) => {
  let groupId: string | undefined;
  if (request.method === "POST" || request.method === "PUT") {
    groupId = (request.body as { groupId?: string })?.groupId;
  }
  if (request.method === "GET" || request.method === "DELETE") {
    groupId = (request.query as { groupId?: string })?.groupId;
  }
  const user = request.user;
  const groupServices: GroupServices = request.diScope.resolve("groupServices");
  try {
    const group: GroupTypes | null = await groupServices.findOneGroup({
      condition: { groupId },
      selectedFields: {
        groups: ["groupId", "ownerId", "admins"],
      },
    });
    if (!group) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 404,
        message: "There is no any group with such ID.",
      });
    }
    const isGroupOwner = group?.ownerId == user?.userId ? true : false;
    const grupAdmins: AdminTypes[] = group?.admins!;
    const isGroupAdmin: boolean = !!grupAdmins?.find(
      (admin) => admin.userId === user?.userId
    );

    if (!isGroupAdmin && !isGroupOwner) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 403,
        message: "Just owner or admin of this group can add member.",
      });
    }
    request.user = {
      ...request.user,
      role: isGroupOwner ? "owner" : "admin",
    };
  } catch (error) {
    return sendErrorResponse(reply, error);
  }
};

export default isGroupAdminOrOwner;
