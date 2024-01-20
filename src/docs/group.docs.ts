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
  "/group/get-admins": {
    get: {
      tags: ["Group"],
      summary: "Get all admins of a group.",
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
          name: "groupId",
          in: "query",
          description: "ID of group that you want to get admins of that.",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "group",
          in: "query",
          description:
            "If true, the response will include information about the group.,",
          schema: {
            type: "string",
          },
        },
        {
          name: "user",
          in: "query",
          description:
            "If true, the response will include information about the admins.,",
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
  "/group/get-members": {
    get: {
      tags: ["Group"],
      summary: "Get all members of a group.",
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
          name: "groupId",
          in: "query",
          description: "ID of group that you want to get admins of that.",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "group",
          in: "query",
          description:
            "If true, the response will include information about the groups.,",
          schema: {
            type: "string",
          },
        },
        {
          name: "user",
          in: "query",
          description:
            "If true, the response will include information about the members.,",
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
  "/group/get-group/{groupId}": {
    get: {
      tags: ["Group"],
      summary:
        "Get group by ID with information about owner, admins, members and messages.",
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
          name: "groupId",
          in: "params",
          required: true,
          description: "ID of group",
          schema: {
            type: "string",
          },
        },
        {
          name: "owner",
          in: "query",
          description:
            "If true, the response will include information about the owner.,",
          schema: {
            type: "string",
          },
        },
        {
          name: "admins",
          in: "query",
          description:
            "If true, the response will include information about the admins.,",
          schema: {
            type: "string",
          },
        },
        {
          name: "members",
          in: "query",
          description:
            "If true, the response will include information about the members.,",
          schema: {
            type: "string",
          },
        },
        {
          name: "messages",
          in: "query",
          description:
            "If true, the response will include information about the messages.,",
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
          description: "There is no any group with such ID.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/group/get-one-admin": {
    get: {
      tags: ["Group"],
      summary: "Get one group admin by user ID and group ID.",
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
          name: "groupId",
          in: "query",
          description: "ID of group that you want to get admins of that.",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "userId",
          in: "query",
          description: "ID of user that you want to get admins of that.",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "group",
          in: "query",
          description:
            "If true, the response will include information about the group.,",
          schema: {
            type: "string",
          },
        },
        {
          name: "user",
          in: "query",
          description:
            "If true, the response will include information about the admin.,",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Successfull response.",
        },
        404: {
          description: "There is no any admin with such group ID and user ID.",
        },
        500: {
          description: "Internal Server Error.",
        },
      },
    },
  },
  "/group/update": {
    put: {
      tags: ["Group"],
      summary: "Update group by owner or admin of group.",
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
              groupId: {
                type: "string",
                description: "ID of group.",
              },
              title: {
                type: "string",
                description: "Title of group.",
              },
              bio: {
                type: "string",
                description: "Bio of group.",
              },
              imagePath: {
                type: "string",
                description: "Path of image of group.",
              },
              updatedAt: {
                type: "date",
                description: "The date that group was updated.",
              },
            },
            required: ["groupId"],
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
export default groupDocs;
