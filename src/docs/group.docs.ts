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
  "/group/add-admin": {
    post: {
      tags: ["Group"],
      summary: "Add an user to admins of a group.",
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
              userId: {
                type: "string",
                description:
                  "ID of user that you want to add its to admin a group.",
              },
              groupId: {
                type: "string",
                description: "ID of group that you want to add user to admins.",
              },
            },
            required: ["userId", "groupId"],
          },
        },
      ],
      responses: {
        200: {
          description: "Successful response. Added.",
        },
        403: {
          description: "You can not add yourself to admin.",
        },
        409: {
          description: "Desire user is still an admin.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/group/add-member": {
    post: {
      tags: ["Group"],
      summary: "Add member to a group.",
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
              userId: {
                type: "string",
                description:
                  "ID of user that you want add its to member of a group.",
              },
              groupId: {
                type: "string",
                description: "ID of group that you want add user to member.",
              },
            },
            required: ["userId", "groupId"],
          },
        },
      ],
      responses: {
        200: {
          description: "Successful response. Added.",
        },
        403: {
          description: "You can not add youself to this group.",
        },
        409: {
          description:
            "There is an member with such ID in the group with such ID.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/group/get-groups": {
    get: {
      tags: ["Group"],
      summary: "Get all groups based on the user that is member of that.",
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
          in: "quey",
          schema: {
            type: "string",
          },
          description:
            "If true, the response will include information about the owner of the groups.",
        },
      ],
      responses: {
        200: {
          description: "Successful response.",
        },
        500: {
          description: "Internal Sever Error.",
        },
      },
    },
  },
};
export default groupDocs;
