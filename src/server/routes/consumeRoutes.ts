import { FastifyInstance } from "fastify";

import { Client } from "../../interfaces/Client";
import { errorHandler } from "../../utils/errorHandler";

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
  try {
    app.get("/data", (req, res) => {
      res.send(client.cache.cache);
    });
  } catch (err) {
    await errorHandler("data route", err);
  }
};

/**
 * Route to get current data.
 *
 * @param {FastifyInstance} app The Fastify app.
 * @param {object} param1 Options object.
 * @param {Client} param1.client The client.
 */
export const latestRoute = async (
  app: FastifyInstance,
  { client }: { client: Client }
) => {
  try {
    app.get("/latest", (req, res) => {
      res.send(client.cache.latest);
    });
  } catch (err) {
    await errorHandler("data route", err);
  }
};
