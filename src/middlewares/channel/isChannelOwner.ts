import { preHandlerHookHandler } from "fastify";
import ChannelServices from "../../services/channel.services";
import sendResponse from "../../utils/sendResponse";
import sendErrorResponse from "../../utils/sendErrorResponse";

const isChannelOwner: preHandlerHookHandler = async (request, reply, done) => {
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
  const user = request.user;
  try {
    const channelServices: ChannelServices =
      request.diScope.resolve("channelServices");

    const isChannelOwner: boolean = !!(await channelServices.findOneChannel({
      condition: {
        channelId: channelId as string,
        ownerId: user?.userId,
      },
      selectedFields: {
        channels: ["channelId"],
      },
    }));
    if (!isChannelOwner) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 400,
        message: "Just owner of group can access to this route.",
      });
    }
  } catch (error) {
    return sendErrorResponse(reply, error);
  }
};

export default isChannelOwner;
