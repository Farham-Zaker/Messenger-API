const privateChatDocs = {
  "/privateChat/create": {
    post: {
      tags: ["Private Chat"],
      summary: "Create private chat between 2 users.",
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
              partnerUserId: {
                type: "string",
                description:
                  "ID of user that you want to create chat between you and its.",
              },
            },
            required: ["partnerUserId"],
          },
        },
      ],
      responses: {
        201: {
          description: "The chat was created.",
        },
        409: {
          description: "There is already a chat between you and desire users.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/privateChat/get": {
    get: {
      tags: ["Private Chat"],
      summary: "Get all private chat.",
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
      ],
      responses: {
        200: {
          description: "Get all private chats.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/privateChat/get/{privateChatId}": {
    get: {
      tags: ["Private Chat"],
      summary: "Get private chat by id.",
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
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
        404: {
          description: "There is no any private chat with such id.",
        },
        500: {
          description: "Internal Servet Error.",
        },
      },
    },
  },

  
};

export default privateChatDocs;
