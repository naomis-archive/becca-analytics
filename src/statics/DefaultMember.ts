import { members } from "@prisma/client";

export const DefaultMember: Omit<members, "id" | "timestamp"> = {
  count: 0,
};
