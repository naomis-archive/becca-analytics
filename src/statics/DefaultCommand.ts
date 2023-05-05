import { commands } from "@prisma/client";

const automodSubcommands = {
  automod_channels: 0,
  no_automod_channels: 0,
  automod_roles: 0,
  allowed_links: 0,
  link_message: 0,
  profanity_message: 0,
  antiphish: 0,
  links: 0,
  profanity: 0,
};

const configSubcommands = {
  suggestion_channel: 0,
  hearts: 0,
  blocked: 0,
  appeal_link: 0,
  sass_mode: 0,
  emote_channels: 0,
  report_channel: 0,
  ticket_category: 0,
  ticket_log_channel: 0,
  ticket_role: 0,
  starboard_emote: 0,
  starboard_channel: 0,
  starboard_threshold: 0,
};

const levelSubcommands = {
  toggle: 0,
  level_channel: 0,
  level_roles: 0,
  level_style: 0,
  level_message: 0,
  role_message: 0,
  initial_xp: 0,
  level_ignore: 0,
  level_decay: 0,
};

const logSubcommands = {
  message_events: 0,
  voice_events: 0,
  thread_events: 0,
  member_events: 0,
  moderation_events: 0,
};

const welcomeSubcommands = {
  welcome_channel: 0,
  depart_channel: 0,
  custom_welcome: 0,
  leave_message: 0,
  join_role: 0,
  welcome_style: 0,
};

export const DefaultCommand: Omit<commands, "id" | "timestamp"> = {
  automod: {
    set: automodSubcommands,
    reset: automodSubcommands,
    view: automodSubcommands,
  },
  becca: {
    ping: 0,
    help: 0,
    about: 0,
    invite: 0,
    art: 0,
    donate: 0,
    uptime: 0,
    profile: 0,
    updates: 0,
    stats: 0,
    emote: 0,
    adventure: 0,
    privacy: 0,
    contact: 0,
    translators: 0,
    feedback: 0,
  },
  code: {
    caniuse: 0,
    colour: 0,
    http: 0,
  },
  community: {
    level: 0,
    motivation: 0,
    schedule: 0,
    star: 0,
    starcount: 0,
    topic: 0,
    userinfo: 0,
    server: 0,
    suggest: 0,
    poll: 0,
    ticket: 0,
    leaderboard: 0,
  },
  config: {
    set: configSubcommands,
    reset: configSubcommands,
    view: configSubcommands,
  },
  currency: {
    daily: 0,
    weekly: 0,
    claim: 0,
    about: 0,
    slots: 0,
    twentyone: 0,
    guess: 0,
    view: 0,
  },
  emote: {
    use: 0,
    view: 0,
  },
  games: {
    fact: 0,
    mtg: 0,
    sus: 0,
    trivia: 0,
    slime: 0,
  },
  levels: {
    set: levelSubcommands,
    reset: levelSubcommands,
    view: levelSubcommands,
  },
  log: {
    set: logSubcommands,
    reset: logSubcommands,
    view: logSubcommands,
  },
  manage: {
    resetlevels: 0,
    resetstars: 0,
    suggestion: 0,
    xpmodify: 0,
  },
  misc: {
    space: 0,
    username: 0,
    xkcd: 0,
    permissions: 0,
    levelscale: 0,
    language: 0,
  },
  mod: {
    warn: 0,
    mute: 0,
    unmute: 0,
    kick: 0,
    ban: 0,
    history: 0,
    unban: 0,
  },
  optout: 0,
  post: {
    create: 0,
    edit: 0,
    delete: 0,
  },
  reactionRole: {
    create: 0,
    add: 0,
    remove: 0,
  },
  triggers: {
    add: 0,
    remove: 0,
    view: 0,
  },
  userconfig: {
    view: 0,
    levelcard: 0,
  },
  welcome: {
    set: welcomeSubcommands,
    reset: welcomeSubcommands,
    view: welcomeSubcommands,
  },
};
