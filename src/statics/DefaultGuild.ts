import { guilds } from "@prisma/client";

export const DefaultGuild: Omit<guilds, "id" | "timestamp"> = {
  count: 0,
};
