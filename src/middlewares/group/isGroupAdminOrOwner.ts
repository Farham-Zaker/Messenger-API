import { preHandlerHookHandler } from "fastify";
import GroupServices from "../../services/group.services";
import sendResponse from "../../utils/sendResponse";
import sendErrorResponse from "../../utils/sendErrorResponse";

type BodyTypes = {
  userId: string;
  groupId: string;
};
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
  const { groupId } = request.body as BodyTypes;
  const user = request.user;
  const groupServices: GroupServices = request.diScope.resolve("groupServices");
  try {
    const group: GroupTypes | null = await groupServices.findOneGroup({
      condition: { groupId },
      selectedFields: {
        groups: ["groupId", "ownerId", "admins"],
      },
    });
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
  } catch (error) {
    return sendErrorResponse(reply, error);
  }
};

export default isGroupAdminOrOwner;
