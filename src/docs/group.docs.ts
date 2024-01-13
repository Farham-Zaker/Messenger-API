const groupDocs = {
  "/group/create": {
    post: {
      tags: ["Group"],
      summary: "Create a group.",
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
              title: {
                type: "string",
                description: "Title of group.",
              },
              bio: {
                type: "string",
                description: "Biography of group.",
              },
              imagePath: {
                type: "string",
                description: "The path of image that was uploaded on server.",
              },
            },
            required: ["title"],
          },
        },
      ],
      responses: {
        200: {
          description: "Successful response.",
        },
        500: {
          description: "Intenal Server Error.",
        },
      },
    },
  },
};
export default groupDocs;
