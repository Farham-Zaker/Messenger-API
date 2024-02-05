import { preHandlerHookHandler } from "fastify";
import ChannelServices from "../../services/channel.services";
import sendResponse from "../../utils/sendResponse";
import sendErrorResponse from "../../utils/sendErrorResponse";

type ChannelType = {
  channelId?: string;
  ownerId?: string;
};
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

    const channel: ChannelType | null = await channelServices.findOneChannel({
      condition: {
        channelId: channelId as string,
      },
      selectedFields: {
        channels: ["channelId", "ownerId"],
      },
    });
    if (!channel) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 403,
        message: "There is no any channel with such ID.",
      });
    }
    if (channel.ownerId !== user?.userId) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 400,
        message: "Just owner of this channel can access to this route.",
      });
    }
  } catch (error) {
    return sendErrorResponse(reply, error);
  }
};

export default isChannelOwner;
