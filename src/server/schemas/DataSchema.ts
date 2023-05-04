export const DataSchema = {
  description: "See current data.",
  tags: ["consume"],
  response: {
    200: {
      description: "The cached analytics data.",
      type: "object",
      properties: {
        guilds: {
          type: "array",
        },
        members: {
          type: "array",
        },
        events: {
          type: "array",
        },
        errors: {
          type: "array",
        },
        commands: {
          type: "array",
        },
      },
    },
  },
};
