import { PrismaClient } from "@prisma/client";

import { Cache } from "../modules/Cache";

export interface Client {
  db: PrismaClient;
  cache: Cache;
}
