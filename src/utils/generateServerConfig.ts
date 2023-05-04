import { readFile } from "fs/promises";

export const generateServerConfig = async () => {
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

  return {
    logger: false,
    https: {
      key: privateKey,
      cert: certificate,
    },
  };
};
