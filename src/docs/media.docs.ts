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
};
export default mediaDocs;
