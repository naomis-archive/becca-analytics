import { commands, errors, events, guilds, members } from "@prisma/client";

export interface CacheData {
  guilds: guilds[];
  members: members[];
  errors: errors[];
  events: events[];
  commands: commands[];
}

export interface CurrentData {
  guild: Omit<guilds, "id"> | null;
  member: Omit<members, "id"> | null;
  error: Omit<errors, "id"> | null;
  event: Omit<events, "id"> | null;
  command: Omit<commands, "id"> | null;
}
