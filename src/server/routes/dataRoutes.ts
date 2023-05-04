import { FastifyInstance, FastifyRequest } from "fastify";

import { Client } from "../../interfaces/Client";

export const guildRoute = async (
  app: FastifyInstance,
  { client }: { client: Client }
) => {
  app.post(
    "/guilds",
    (req: FastifyRequest<{ Body: { count: number } }>, res) => {
      const { count } = req.body;

      client.cache.updateCurrentGuild(count);

      res.send({
        message: `Current guild count is ${client.cache.latest.guild?.count}`,
      });
    }
  );
};
