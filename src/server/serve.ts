import Fastify from "fastify";

import { Client } from "../interfaces/Client";
import { generateServerConfig } from "../utils/generateServerConfig";

import { guildRoute } from "./routes/dataRoutes";

export const serve = async (client: Client) => {
  const config = await generateServerConfig();
  const app = Fastify(config);

  // mount your middleware and routes here
  app.register(guildRoute, { client });

  app.get("/data", (req, res) => {
    res.send(client.cache.cache);
  });

  app.listen({ port: 2000 });
};
