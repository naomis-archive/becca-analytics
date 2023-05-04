export const EventSchema = {
  description: "Update the count for a gateway event.",
  tags: ["data"],
  body: {
    type: "object",
    properties: {
      event: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      description: "Event count successfully updated.",
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
