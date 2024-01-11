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
  "/message/get/": {
    get: {
      tags: ["Message"],
      summary:
        "Get messages based on private chat ID or group ID or channel ID.",
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
          required: true,
          schema: {
            type: "string",
          },

          description:
            "The privateChatId parameter represents the unique identifier for private chats.",
        },
        {
          name: "channelId",
          in: "query",
          required: true,
          description:
            "The channelId parameter represents the unique identifier for channels.",
          schema: {
            type: "string",
          },
        },
        {
          name: "groupId",
          in: "query",
          required: true,
          description:
            "The groupId parameter represents the unique identifier for groups.",
          schema: {
            type: "string",
          },
        },
        {
          name: "sender",
          in: "query",
          description:
            "If true, the response will include information about the sender.",
          schema: {
            type: "string",
          },
        },
        {
          name: "media",
          in: "query",
          description:
            "If true, the response will include information about the media.",
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
          name: "channel",
          in: "query",
          description:
            "If true, the response will include information about the channel.",
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
          name: "searchTerm",
          in: "query",
          description:
            "If true, the response will include information about the searchTerm.",
          schema: {
            type: "string",
          },
        },
        {
          name: "take",
          in: "query",
          required: true,
          description:
            "If true, the response will include information about the take.",
          schema: {
            type: "number",
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
  "/message/get/{messageId}": {
    get: {
      tags: ["Message"],
      summary: "Get unique message base on ID of message.",
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
          name: "sender",
          in: "query",
          description:
            "If true, the response will include information about the sender.",
          schema: {
            type: "string",
          },
        },
        {
          name: "media",
          in: "query",
          description:
            "If true, the response will include information about the media.",
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
          name: "channel",
          in: "query",
          description:
            "If true, the response will include information about the channel.",
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
      ],
      responses: {
        200: {
          description: "Successful response.",
        },
        404: {
          description: "Error. There is no any message with ID that sent.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/message/update": {
    put: {
      tags: ["Message"],
      summary: "Update message base on message ID.",
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
          required: true,
          schema: {
            type: "object",
            properties: {
              messageId: {
                type: "string",
                description: "ID of message that you want to update.",
              },
              text: {
                type: "string",
                description: "Text of message.",
              },
              replyOf: {
                type: "string",
                description:
                  "The ID of message that this message is reply of that message.",
              },
              updatedAt: {
                type: "string",
                description: "The date that the message was been updated.",
              },
              required: ["messageId"],
            },
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
};
export default messageDocs;
