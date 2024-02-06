import { preHandlerHookHandler } from "fastify";
import ChannelServices from "../../services/channel.services";
import sendErrorResponse from "../../utils/sendErrorResponse";
import sendResponse from "../../utils/sendResponse";

type ChannelType = {
  adminId?: string;
  admins?: { adminId: string; userId: string; channelId: string }[];
  ownerId?: string;
};
const isChannelOrOwnerOrAdmin: preHandlerHookHandler = async (
  request,
  reply,
  done
) => {
  const user = request.user;
  let channelId: string | undefined;
  switch (request.method) {
    case "POST":
    case "PUT":
      channelId =
        (request.params as { channelId?: string })?.channelId ||
        (request.body as { channelId?: string })?.channelId;
      break;

    case "GET":
    case "DELETE":
      channelId = (request.query as { channelId?: string })?.channelId;
      break;
  }
  try {
    const channelServices: ChannelServices =
      request.diScope.resolve("channelServices");
    const channel: ChannelType | null = await channelServices.findOneChannel({
      condition: {
        channelId: channelId as string,
      },
      selectedFields: {
        channels: ["channelId", "admins", "ownerId"],
      },
    });
    if (!channel) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 404,
        message: "There is not any channel with such ID.",
      });
    }
    // Check if user is owner of channel or not
    const isUserOwnerOfChannel: boolean =
      channel?.ownerId === user?.userId && true;

    //   Check if user is admin of channel or not
    const isUserAdminOfChannel: boolean = !!channel?.admins?.find(
      (admin) => admin.userId === user?.userId
    );
    // Send error response when user is not owner or admin of channel
    if (!isUserOwnerOfChannel && !isUserAdminOfChannel) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 400,
        message: "Just owner or admin of channel can access to this route.",
      });
    }
    request.user = {
      ...request.user,
      role: isUserOwnerOfChannel ? "owner" : "admin",
    };
  } catch (error) {
    return sendErrorResponse(reply, error);
  }
};

export default isChannelOrOwnerOrAdmin;
