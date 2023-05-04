import { commands, errors, events, guilds, members } from "@prisma/client";

export interface CacheData {
  guilds: guilds[];
  members: members[];
  errors: errors[];
  events: events[];
  commands: commands[];
}

export interface CurrentData {
  guild: Omit<guilds, "id">;
  member: Omit<members, "id">;
  error: Omit<errors, "id">;
  event: Omit<events, "id">;
  command: Omit<commands, "id">;
}
