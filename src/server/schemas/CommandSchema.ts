export const CommandSchema = {
  description: "Update the count for a command use.",
  tags: ["data"],
  body: {
    type: "object",
    properties: {
      command: {
        type: ["string"],
      },
      subcommand: {
        type: ["string", "null"],
      },
      subcommandGroup: {
        type: ["string", "null"],
      },
    },
  },
  response: {
    200: {
      description: "Guild successfully updated.",
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
