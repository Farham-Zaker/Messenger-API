const channelDocs = {
  "/channel/create": {
    post: {
      tags: ["Channel"],
      summary: "Create a Channel.",
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
              title: {
                type: "string",
                description: "Title of channel.",
              },
              bio: {
                type: "string",
                description: "Bio of channel.",
              },
              imagePath: {
                type: "string",
                desctiption: "URl of image that uploaded on server.",
              },
            },
            required: ["title", "bio"],
          },
        },
      ],
      responses: {
        201: {
          description: "Successfull response.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
};
export default channelDocs;
