export const ErrorSchema = {
  description: "Report a handled or unhandled error.",
  tags: ["data"],
  body: {
    type: "object",
    properties: {
      handled: {
        type: "boolean",
      },
    },
  },
  response: {
    200: {
      description: "Error counts successfully updated.",
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
