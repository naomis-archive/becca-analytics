import { readFile } from "fs/promises";

/**
 * Dynamically generates the Fastify config
 * based on the environment.
 *
 * @returns {object} The fastify config.
 */
export const generateServerConfig = async (): Promise<object> => {
  if (process.env.NODE_ENV !== "production") {
    return { logger: true };
  }

  const privateKey = await readFile(
    "/etc/letsencrypt/live/analytics.beccalyria.com/privkey.pem",
    "utf8"
  );
  const certificate = await readFile(
    "/etc/letsencrypt/live/analytics.beccalyria.com/cert.pem",
    "utf8"
  );
  const ca = await readFile(
    "/etc/letsencrypt/live/analytics.beccalyria.com/chain.pem",
    "utf8"
  );

  return {
    logger: false,
    https: {
      key: privateKey,
      cert: certificate,
      ca,
    },
  };
};
