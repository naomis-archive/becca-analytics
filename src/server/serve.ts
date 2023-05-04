import Fastify from "fastify";

import { Client } from "../interfaces/Client";
import { generateServerConfig } from "../utils/generateServerConfig";

import {
  commandRoute,
  errorRoute,
  eventRoute,
  guildRoute,
  memberRoute,
} from "./routes/dataRoutes";

/**
 * Instantiates the Fastify web server.
 *
 * @param {Client} client The client.
 */
export const serve = async (client: Client) => {
  const config = await generateServerConfig();
  const app = Fastify(config);

  // mount your middleware and routes here
  app.register(guildRoute, { client });
  app.register(memberRoute, { client });
  app.register(eventRoute, { client });
  app.register(commandRoute, { client });
  app.register(errorRoute, { client });

  app.get("/data", (req, res) => {
    res.send(client.cache.cache);
  });

  app.listen({ port: 2000 });
};
