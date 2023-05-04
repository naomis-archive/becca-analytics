import { CacheData, CurrentData } from "../interfaces/CacheData";
import {
  CommandWithNothing,
  CommandWithSubcommandGroups,
  CommandWithSubcommands,
  Event,
  SubcommandGroup,
} from "../interfaces/SchemaTypes";
import { DefaultCommand } from "../statics/DefaultCommand";
import { DefaultError } from "../statics/DefaultError";
import { DefaultEvent } from "../statics/DefaultEvent";
import { DefaultGuild } from "../statics/DefaultGuild";
import { DefaultMember } from "../statics/DefaultMember";
import {
  isValidCommandWithGroups,
  isValidCommandWithSubcommands,
  isValidSubcommand,
  isValidSubcommandGroup,
  isValidSubcommandInGroup,
} from "../utils/typeGuards";

/**
 * Cache data to avoid excessive database reads.
 *
 * @class
 */
export class Cache {
  private readonly _cache: CacheData;
  private readonly _latest: CurrentData;

  /**
   * @param {CacheData} init Optional data to start with.
   * @public
   */
  constructor(init?: CacheData) {
    this._cache = {
      guilds: init?.guilds || [],
      members: init?.members || [],
      errors: init?.errors || [],
      events: init?.events || [],
      commands: init?.commands || [],
    };
    this._latest = this.generateLatest();
  }

  /**
   * Resets the latest cache.
   *
   * @returns {CurrentData} The latest cache.
   */
  private generateLatest(): CurrentData {
    return {
      guild: {
        ...DefaultGuild,
        timestamp: new Date(),
      },
      member: {
        ...DefaultMember,
        timestamp: new Date(),
      },
      error: {
        ...DefaultError,
        timestamp: new Date(),
      },
      event: {
        ...DefaultEvent,
        timestamp: new Date(),
      },
      command: {
        ...DefaultCommand,
        timestamp: new Date(),
      },
    };
  }

  /**
   * @type {CacheData}
   * @public
   * @readonly
   */
  public get cache(): CacheData {
    return this._cache;
  }

  /**
   * @type {CurrentData}
   * @public
   * @readonly
   */
  public get latest(): CurrentData {
    return this._latest;
  }

  /**
   * Add a guild record to the cache.
   *
   * @param {CacheData["guilds"]} guild The record to add.
   * @public
   */
  public addGuild(guild: CacheData["guilds"][0]): void {
    this._cache.guilds.push(guild);
  }

  /**
   * Add a member record to the cache.
   *
   * @param {CacheData["members"]} member The record to add.
   * @public
   */
  public addMember(member: CacheData["members"][0]): void {
    this._cache.members.push(member);
  }

  /**
   * Add a command record to the cache.
   *
   * @param {CacheData["commands"]} error The record to add.
   * @public
   */
  public addError(error: CacheData["errors"][0]): void {
    this._cache.errors.push(error);
  }

  /**
   * Add an event record to the cache.
   *
   * @param {CacheData["events"]} event The record to add.
   * @public
   */
  public addEvent(event: CacheData["events"][0]): void {
    this._cache.events.push(event);
  }

  /**
   * Add a command record to the cache.
   *
   * @param {CacheData["commands"]} command The record to add.
   * @public
   */
  public addCommand(command: CacheData["commands"][0]): void {
    this._cache.commands.push(command);
  }

  /**
   * Updates the current guild record with the new count.
   *
   * @param {number} count The current count.
   * @public
   */
  public updateCurrentGuild(count: number): void {
    if (this._latest.guild) {
      this._latest.guild.count = count;
      return;
    }
    this._latest.guild = {
      count,
      timestamp: new Date(),
    };
  }

  /**
   * Updates the current member record with the new count.
   *
   * @param {number} count The current count.
   * @public
   */
  public updateCurrentMember(count: number): void {
    if (this._latest.member) {
      this._latest.member.count = count;
      return;
    }
    this._latest.member = {
      count,
      timestamp: new Date(),
    };
  }

  /**
   * Increments the handled or unhandled property on the current
   * error record.
   *
   * @param {number} handled Whether the error was handled.
   * @public
   */
  public updateCurrentError(handled: boolean): void {
    if (this._latest.error) {
      handled ? this._latest.error.handled++ : this._latest.error.unhandled++;
      return;
    }
    this._latest.error = {
      handled: handled ? 1 : 0,
      unhandled: handled ? 0 : 1,
      timestamp: new Date(),
    };
  }

  /**
   * Increments the event on the current event record.
   *
   * @param {Event} event The event to increment.
   * @public
   */
  public updateCurrentEvent(event: Event): void {
    if (this._latest.event) {
      this._latest.event[event]++;
      return;
    }
    this._latest.event = {
      ...DefaultEvent,
      [event]: 1,
      timestamp: new Date(),
    };
  }

  /**
   * Updates the command record with a new command use.
   *
   * @param {CommandWithNothing} command The command to update.
   * @returns {boolean} Whether the command was updated.
   * @public
   */
  public updateCurrentCommand(command: CommandWithNothing): boolean;
  /**
   * Updates the command record with a new command use.
   *
   * @param {CommandWithSubcommands} command The command to update.
   * @param {string} subcommand The subcommand to update.
   * @returns {boolean} Whether the command was updated.
   * @public
   */
  public updateCurrentCommand(
    command: CommandWithSubcommands,
    subcommand: string
  ): boolean;
  /**
   * Updates the command record with a new command use.
   *
   * @param {CommandWithSubcommandGroups} command The command to update.
   * @param {SubcommandGroup} subcommandGroup The subcommand group to update.
   * @param {string} subcommand The subcommand to update.
   * @returns {boolean} Whether the command was updated.
   * @public
   */
  public updateCurrentCommand(
    command: CommandWithSubcommandGroups,
    subcommandGroup: SubcommandGroup,
    subcommand: string
  ): boolean;
  /**
   * Updates the command record with a new command use.
   *
   * @param {CommandWithNothing | CommandWithSubcommandGroups | CommandWithSubcommands} command The command to update.
   * @param {SubcommandGroup | string} subcommandOrGroup The subcommand or subcommand group to update.
   * @param {string} subcommand The subcommand to update, if previous parameter is the subcommand group.
   * @returns {boolean} Whether the command was updated.
   * @public
   */
  public updateCurrentCommand(
    command:
      | CommandWithSubcommandGroups
      | CommandWithSubcommands
      | CommandWithNothing,
    subcommandOrGroup?: SubcommandGroup | string,
    subcommand?: string
  ) {
    if (!this._latest.command) {
      this._latest.command = {
        ...DefaultCommand,
        timestamp: new Date(),
      };
    }
    if (command && !subcommandOrGroup && !subcommand) {
      if (command !== "optout") {
        return false;
      }
      this._latest.command[command]++;
      return true;
    }
    if (subcommandOrGroup && subcommand) {
      if (
        !isValidCommandWithGroups(command) ||
        !isValidSubcommandGroup(subcommandOrGroup) ||
        !isValidSubcommandInGroup(subcommand, subcommandOrGroup, command)
      ) {
        return false;
      }
      this._latest.command[command][subcommandOrGroup][subcommand]++;
      return true;
    }
    if (command && subcommandOrGroup) {
      if (
        !isValidCommandWithSubcommands(command) ||
        !isValidSubcommand(subcommandOrGroup, command)
      ) {
        return false;
      }
      this._latest.command[command][subcommandOrGroup]++;
      return true;
    }
    return false;
  }

  /**
   * Clears the current latest cache, preparing for a new set of data.
   *
   * @returns {CurrentData} The current cache to insert into the database.
   * @public
   */
  public bustLatestCache(): CurrentData {
    const latest = this._latest;
    const { guild, member, error, event, command } = this.generateLatest();
    this._latest.guild = guild;
    this._latest.member = member;
    this._latest.error = error;
    this._latest.event = event;
    this._latest.command = command;
    return latest;
  }
}
