const messageDocs = {
  "/message/send": {
    post: {
      tags: ["Message"],
      summary: "Send a message in private chat or group or channel.",
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
          name: "body",
          in: "body",
          schema: {
            type: "object",
            properties: {
              text: {
                type: "string",
                description: "The text that user want to sent.",
              },
              privateChatId: {
                type: "string",
                description:
                  "ID of private chat. (Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.)",
              },
              groupId: {
                type: "string",
                description:
                  "ID of group. (Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.)",
              },
              channelId: {
                type: "string",
                description:
                  "ID of channel. (Just one of the values of 'privateChatId' or 'groupId' or 'channelId' must be sent.)",
              },
              replyOf: {
                type: "string",
                description:
                  "The ID of message that this message is reply of that.",
              },
              mediaId: {
                type: "string",
                description: "ID of media that this message is blong to that.",
              },
            },
            required: ["text"],
          },
        },
      ],
      responses: {
        201: {
          description: "Success. Message sent successfully.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
};
export default messageDocs;
