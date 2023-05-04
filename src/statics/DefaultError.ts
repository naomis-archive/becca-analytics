import { errors } from "@prisma/client";

export const DefaultError: Omit<errors, "id" | "timestamp"> = {
  handled: 0,
  unhandled: 0,
};
