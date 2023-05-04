import { CacheData, CurrentData } from "../interfaces/CacheData";
import {
  CommandWithSubcommandGroups,
  CommandWithSubcommands,
  Event,
  SubcommandGroup,
} from "../interfaces/SchemaTypes";
import { DefaultCommand } from "../statics/DefaultCommand";
import { DefaultEvent } from "../statics/DefaultEvent";
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
    this._latest = {
      guild: null,
      member: null,
      error: null,
      event: null,
      command: null,
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

  public updateCurrentEvent(event: Event, count: number): void {
    if (this._latest.event) {
      this._latest.event[event] = count;
      return;
    }
    this._latest.event = {
      ...DefaultEvent,
      [event]: count,
      timestamp: new Date(),
    };
  }

  public updateCurrentCommand(
    command: CommandWithSubcommands,
    subcommand: string
  ): boolean;
  public updateCurrentCommand(
    command: CommandWithSubcommandGroups,
    subcommandGroup: SubcommandGroup,
    subcommand: string
  ): boolean;
  public updateCurrentCommand(
    command: CommandWithSubcommandGroups | CommandWithSubcommands,
    subcommandOrGroup: SubcommandGroup | string,
    subcommand?: string
  ) {
    if (!this._latest.command) {
      this._latest.command = {
        ...DefaultCommand,
        timestamp: new Date(),
      };
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
    if (
      !isValidCommandWithSubcommands(command) ||
      !isValidSubcommand(subcommandOrGroup, command)
    ) {
      return false;
    }
    this._latest.command[command][subcommandOrGroup]++;
    return true;
  }

  public bustLatestCache(): CurrentData {
    const latest = this._latest;
    this._latest.guild = null;
    this._latest.member = null;
    this._latest.error = null;
    this._latest.event = null;
    this._latest.command = null;
    return latest;
  }
}
