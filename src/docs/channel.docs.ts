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
  "/channel/upload-profile-photo/{channelId}": {
    post: {
      tags: ["Channel"],
      summary: "Upload photo for profile of channel.",
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
              file: {
                type: "object",
                description: "Selected file in HTML file input.",
              },
            },
            required: ["file"],
          },
        },
      ],
      responses: {
        200: {
          description: "Successful response.",
        },
        400: {
          description: "No file uploaded.",
        },
        415: {
          description: "Unsupported Media Type.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/channel/join/{channelId}": {
    post: {
      tags: ["Channel"],
      summary: "Join to channel.",
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
          name: "channelId",
          in: "params",
          required: true,
          description: "ID of channel",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Successfull response",
        },
        400: {
          description: "Existence of user in the channel.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/channel/get-channels": {
    get: {
      tags: ["Channel"],
      summary: "Get all channels by ID of the user that logged in.",
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
          name: "owner",
          in: "query",
          description:
            "If true, the response will include information about the owner of the channel.",
          schema: {
            type: "string",
          },
        },
        {
          name: "admins",
          in: "query",
          description:
            "If true, the response will include information about the admins of the channel.",
          schema: {
            type: "string",
          },
        },
        {
          name: "members",
          in: "query",
          description:
            "If true, the response will include information about the members of the channel.",
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
  "/channel/get-admins": {
    get: {
      tags: ["Channel"],
      summary: "Get all admins of a channel.",
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
          name: "channel",
          in: "query",
          description:
            "If true, the response will include information about the channel.",
          schema: {
            type: "string",
          },
        },
        {
          name: "user",
          in: "query",
          description:
            "If true, the response will include information about the admin.",
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
};

export default channelDocs;
