import { commands } from "@prisma/client";
import {
  Command,
  CommandWithNothing,
  CommandWithSubcommandGroups,
  CommandWithSubcommands,
  Event,
  SubcommandGroup,
} from "../interfaces/SchemaTypes";
import { DefaultEvent } from "../statics/DefaultEvent";
import { DefaultCommand } from "../statics/DefaultCommand";

export const isEventType = (event: string): event is Event => {
  return Object.keys(DefaultEvent).includes(event);
};

export const isValidCommand = (command: string): command is Command => {
  return Object.keys(DefaultCommand).includes(command);
};

export const isValidCommandWithNothing = (
  command: string
): command is CommandWithNothing => {
  const obj: { [key in CommandWithNothing]: string } = {
    optout: "",
  };
  return Object.keys(obj).includes(command);
};

export const isValidCommandWithGroups = (
  command: Command
): command is CommandWithSubcommandGroups => {
  const obj: { [key in CommandWithSubcommandGroups]: string } = {
    automod: "",
    config: "",
    levels: "",
    log: "",
    welcome: "",
  };
  return Object.keys(obj).includes(command);
};

export const isValidCommandWithSubcommands = (
  command: Command
): command is CommandWithSubcommands => {
  const obj: { [key in CommandWithSubcommands]: string } = {
    becca: "",
    code: "",
    community: "",
    currency: "",
    emote: "",
    games: "",
    manage: "",
    misc: "",
    mod: "",
    post: "",
    reactionRole: "",
    triggers: "",
    userconfig: "",
  };
  return Object.keys(obj).includes(command);
};

export const isValidSubcommandGroup = (
  subcommandGroup: string
): subcommandGroup is SubcommandGroup => {
  const obj: { [key in SubcommandGroup]: string } = {
    set: "",
    reset: "",
    view: "",
  };
  return Object.keys(obj).includes(subcommandGroup);
};

export const isValidSubcommand = (
  subcommand: string,
  command: CommandWithSubcommands
): subcommand is keyof commands[CommandWithSubcommands] => {
  const subcommands = DefaultCommand[command];
  return Object.keys(subcommands).includes(subcommand);
};

export const isValidSubcommandInGroup = (
  subcommand: string,
  subcommandGroup: SubcommandGroup,
  command: CommandWithSubcommandGroups
): subcommand is keyof commands[CommandWithSubcommandGroups][SubcommandGroup] => {
  const subcommandGroups = DefaultCommand[command];
  const subcommands = subcommandGroups[subcommandGroup];
  return Object.keys(subcommands).includes(subcommand);
};
