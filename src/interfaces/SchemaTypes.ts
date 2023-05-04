import { commands, events } from "@prisma/client";

export type Event = keyof Omit<events, "id" | "timestamp">;

export type Command = keyof Omit<commands, "id" | "timestamp">;

export type CommandWithNothing = keyof Pick<commands, "optout">;

export type CommandWithSubcommandGroups = keyof Pick<
  commands,
  "automod" | "config" | "levels" | "log" | "welcome"
>;

export type CommandWithSubcommands = Exclude<
  Command,
  CommandWithSubcommandGroups | CommandWithNothing
>;

export type AutomodSubcommandGroups = keyof Pick<commands, "automod">;

export type SubcommandGroup = keyof commands[CommandWithSubcommandGroups];
