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
  "/channel/add-admin": {
    post: {
      tags: ["Channel"],
      summary: "Add a user to admins of channel.",
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
              channelId: {
                type: "string",
                descripton: "ID of channel.",
              },
              userId: {
                type: "string",
                description: "ID of target user.",
              },
            },
            required: ["channelId", "userId"],
          },
        },
      ],
      responses: {
        201: {
          description: "Successful response.",
        },
        400: {
          description: "Just owner of group can add a user to admin.",
        },
        403: {
          description:
            "Owner of channel can not add itself to admin of channel.",
        },
        404: {
          description: "Lack of existence of user in group.",
        },
      },
    },
  },
};

export default channelDocs;
