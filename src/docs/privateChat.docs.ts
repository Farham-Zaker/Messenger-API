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

};

export default privateChatDocs;
