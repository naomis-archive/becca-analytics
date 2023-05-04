export const MemberSchema = {
  description: "Update the current number of members Becca serves.",
  tags: ["data"],
  body: {
    type: "object",
    properties: {
      count: {
        type: "number",
      },
    },
  },
  response: {
    200: {
      description: "Member count successfully updated.",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
    400: {
      description: "Bad request.",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
    401: {
      description: "Unauthorized.",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  },
};
