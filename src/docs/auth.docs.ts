const authDocs = {
  "/auth/send-verification-code": {
    post: {
      tags: ["Authentication"],
      summary: "Send verification code to user 's phone.",
      parameters: [
        {
          name: "body",
          in: "body",
          required: true,
          schema: {
            type: "object",
            properties: {
              areaCode: {
                type: "string",
              },
              phoneNumber: {
                type: "string",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "Success. Verification code was sent to user phone.",
        },
        404: {
          description: "Error. There is not area code such code.",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
  "/verify-phone-number": {
    post: {
      tags: ["Authentication"],
      summary:
        "Verify user phone number if the verification code that sent is valid.",
      parameters: [
        {
          name: "body",
          in: "body",
          required: true,
          schema: {
            type: "object",
            properties: {
              areaCode: {
                type: "string",
              },
              phoneNumber: {
                type: "string",
              },
              verificationCode: {
                type: "string",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "Success. Phone number was verified.",
        },
        401: {
          description: "Error. Invalid verififcation code.",
        },
        404: {
          description: "Error. There is not area code such code.",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
  "/complete-profile": {
    post: {
      tags: ["Authentication"],
      summary:
        "Complete profile if the user that  it was the first time that logged in.",
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
              firstName: {
                type: "string",
              },
              lastName: {
                type: "string",
              },
              username: {
                type: "string",
              },
            },
            required: ["firstName", "lastName"],
          },
        },
      ],
      responses: {
        "200": {
          description: "Profile of user update if needed. Get new token.",
        },
        "409": {
          description: "Error. There is an user with such username.",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
};

export default authDocs;
