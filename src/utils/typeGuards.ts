import { commands } from "@prisma/client";

import {
  Command,
  CommandWithNothing,
  CommandWithSubcommandGroups,
  CommandWithSubcommands,
  Event,
  SubcommandGroup,
} from "../interfaces/SchemaTypes";
import { DefaultCommand } from "../statics/DefaultCommand";
import { DefaultEvent } from "../statics/DefaultEvent";

/**
 * Confirms that the event is a valid event type.
 *
 * @param {string} event The event to validate.
 * @returns {boolean} Whether the event is valid.
 */
export const isEventType = (event: string): event is Event => {
  return Object.keys(DefaultEvent).includes(event);
};

/**
 * Confirms that the command is valid.
 *
 * @param {string} command The command to validate.
 * @returns {boolean} Whether the command is valid.
 */
export const isValidCommand = (command: string): command is Command => {
  return Object.keys(DefaultCommand).includes(command);
};

/**
 * Confirms that the command is one with no subcommands
 * or subcommand groups.
 *
 * @param {string} command The command to validate.
 * @returns {boolean} Whether the command has no subcommands.
 */
export const isValidCommandWithNothing = (
  command: string
): command is CommandWithNothing => {
  const obj: { [key in CommandWithNothing]: string } = {
    optout: "",
  };
  return Object.keys(obj).includes(command);
};

/**
 * Confirms that the command has subcommand groups.
 *
 * @param {string} command The command to validate.
 * @returns {boolean} Whether the command has
 * subcommand groups.
 */
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

/**
 * Confirms that the command has direct subcommands.
 *
 * @param {string} command The command to validate.
 * @returns {boolean} Whether the command has
 * direct subcommands.
 */
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

/**
 * Confirms that the subcommand group is valid.
 *
 * @param {string} subcommandGroup The group to validate.
 * @returns {boolean} Whether the group is valid.
 */
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

/**
 * Confirms that the subcommand is valid.
 *
 * @param {string} subcommand The subcommand to validate.
 * @param {CommandWithSubcommands} command The command to check against.
 * @returns {boolean} Whether the command has the given subcommand.
 */
export const isValidSubcommand = (
  subcommand: string,
  command: CommandWithSubcommands
): subcommand is keyof commands[CommandWithSubcommands] => {
  const subcommands = DefaultCommand[command];
  return Object.keys(subcommands).includes(subcommand);
};

/**
 * Confirms that the subcommand is valid.
 *
 * @param {string} subcommand The subcommand to validate.
 * @param {SubcommandGroup} subcommandGroup The subcommand group to check against.
 * @param {CommandWithSubcommandGroups} command The command to check against.
 * @returns {boolean} Whether the subcommand is part of the subcommand group
 * of the command.
 */
export const isValidSubcommandInGroup = (
  subcommand: string,
  subcommandGroup: SubcommandGroup,
  command: CommandWithSubcommandGroups
): subcommand is keyof commands[CommandWithSubcommandGroups][SubcommandGroup] => {
  const subcommandGroups = DefaultCommand[command];
  const subcommands = subcommandGroups[subcommandGroup];
  return Object.keys(subcommands).includes(subcommand);
};
