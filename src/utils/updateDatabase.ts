import { Client } from "../interfaces/Client";

/**
 * Grabs the latest cache and updates the database.
 *
 * @param {Client} client The client.
 */
export const updateDatabase = async (client: Client) => {
  const { guild, member, command, event, error } =
    client.cache.bustLatestCache();
  const newGuild = await client.db.guilds.create({
    data: guild,
  });
  const newMember = await client.db.members.create({
    data: member,
  });
  const newCommand = await client.db.commands.create({
    data: command,
  });
  const newEvent = await client.db.events.create({
    data: event,
  });
  const newError = await client.db.errors.create({
    data: error,
  });
  client.cache.cache.guilds.push(newGuild);
  client.cache.cache.members.push(newMember);
  client.cache.cache.commands.push(newCommand);
  client.cache.cache.events.push(newEvent);
  client.cache.cache.errors.push(newError);
};
