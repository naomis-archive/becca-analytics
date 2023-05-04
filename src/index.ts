import { PrismaClient, commands } from "@prisma/client";

import { Client } from "./interfaces/Client";
import { Cache } from "./modules/Cache";
import { logHandler } from "./utils/logHandler";
import { serve } from "./server/serve";

(async () => {
  logHandler.log("info", "Starting up...");
  const db = new PrismaClient();
  await db.$connect();
  logHandler.log("info", "Connected to database.");

  const errors = await db.errors.findMany();
  const events = await db.events.findMany();
  // const commands = await db.commands.findMany();
  const command: commands[] = [];
  const guilds = await db.guilds.findMany();
  const members = await db.members.findMany();

  logHandler.log("info", "Cached data.");

  const client: Client = {
    db: new PrismaClient(),
    cache: new Cache({
      errors,
      events,
      commands: command,
      guilds,
      members,
    }),
  };

  logHandler.log("info", "Starting server...");
  await serve(client);
})();
