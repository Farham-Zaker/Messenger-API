const mediaDocs = {
  "/media/send": {
    post: {
      tags: ["Media"],
      summary: "Send a media in private chat or channel or group.",
      parameters: [
        {
          name: "token",
          in: "header",
          description: "Authentication token",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "privateChatId",
          in: "query",
          description:
            "ID of private chat. (Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.)",
          schema: {
            type: "string",
          },
        },
        {
          name: "groupId",
          in: "query",
          description:
            "ID of group. (Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.)",
          schema: {
            type: "string",
          },
        },
        {
          name: "channelId",
          in: "query",
          description:
            "ID of channel. (Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.)",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        201: {
          description: "Successful response.",
        },
        400: {
          description: "Unsupported media type.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/getAll": {
    get: {
      tags: ["Media"],
      summary: "Get all media of a private chat or a group or a channel.",
      parameters: [
        {
          name: "token",
          in: "header",
          description: "Authentication token",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "privateChatId",
          in: "query",
          description:
            "ID of private chat. (Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.)",
          schema: {
            type: "string",
          },
        },
        {
          name: "privateChat",
          in: "query",
          description:
            "If true, the response will include information about the private chat. (When 'privateChatId' is present this value must be sent.)",
          schema: {
            type: "string",
          },
        },
        {
          name: "groupId",
          in: "query",
          description:
            "ID of group. (Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.)",
          schema: {
            type: "string",
          },
        },
        {
          name: "group",
          in: "query",
          description:
            "If true, the response will include information about the group. (When 'groupId' is present this value must be sent.)",
          schema: {
            type: "string",
          },
        },
        {
          name: "channelId",
          in: "query",
          description:
            "ID of channel. (Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.)",
          schema: {
            type: "string",
          },
        },
        {
          name: "channel",
          in: "query",
          description:
            "If true, the response will include information about the channel. (When 'channelId' is present this value must be sent.)",
          schema: {
            type: "string",
          },
        },
        {
          name: "message",
          in: "query",
          description:
            "If true, the response will include information about the message that send with this media.",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Successful response.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/media/get/:mediaId": {
    get: {
      tags: ["Media"],
      summary: "Get media by ID.",
      parameters: [
        {
          name: "token",
          in: "header",
          description: "Authentication token",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "mediaId",
          in: "params",
          description: "ID of media.",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "privateChat",
          in: "query",
          description:
            "If true, the response will include information about the private chat.",
          schema: {
            type: "string",
          },
        },
        {
          name: "group",
          in: "query",
          description:
            "If true, the response will include information about the group.",
          schema: {
            type: "string",
          },
        },
        {
          name: "channel",
          in: "query",
          description:
            "If true, the response will include information about the channel.",
          schema: {
            type: "string",
          },
        },
        {
          name: "message",
          in: "query",
          description:
            "If true, the response will include information about the message.",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Successfull response.",
        },
        404: {
          description: "Lack of existence of media with such ID",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
};
export default mediaDocs;
