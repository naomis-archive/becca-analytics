import { FastifyInstance } from "fastify";

import { Client } from "../../interfaces/Client";
import { DataSchema } from "../schemas/DataSchema";

/**
 * Route to get cached data.
 *
 * @param {FastifyInstance} app The Fastify app.
 * @param {object} param1 Options object.
 * @param {Client} param1.client The client.
 */
export const dataRoute = async (
  app: FastifyInstance,
  { client }: { client: Client }
) => {
  app.get("/data", { schema: DataSchema }, (req, res) => {
    res.send(client.cache.cache);
  });
};
