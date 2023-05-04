import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
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
import { DataSchema } from "./schemas/DataSchema";
import { dataRoute } from "./routes/consumeRoutes";

/**
 * Instantiates the Fastify web server.
 *
 * @param {Client} client The client.
 */
export const serve = async (client: Client) => {
  const config = await generateServerConfig();
  const app = Fastify(config);

  if (process.env.NODE_ENV === "development") {
    app.register(fastifySwagger, {
      swagger: {
        info: {
          title: "Analytics API",
          version: "0.0.0",
        },
        host: "localhost:2000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
          { name: "data", description: "Data related end-points" },
          { name: "consume", description: "Endpoints for consuming data" },
        ],
      },
    });
    app.register(fastifySwaggerUi);
    app.log.info(
      `Swagger docs available at http://localhost:2000/documentation`
    );
  }

  // mount your middleware and routes here
  app.register(guildRoute, { client });
  app.register(memberRoute, { client });
  app.register(eventRoute, { client });
  app.register(commandRoute, { client });
  app.register(errorRoute, { client });
  app.register(dataRoute, { client });

  await app.ready();
  app.listen({ port: 2000 });
};
