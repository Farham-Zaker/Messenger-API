const authDocs = {
  "/auth/send-verification-code": {
    get: {
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
    get: {
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
};

export default authDocs;
