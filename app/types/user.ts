import { User } from "@prisma/client";

export type UserCO = Omit<
  User,
  "emailVerified" | "password" | "createdAt" | "updatedAt"
>;

export function convertUser2CO(user: User): UserCO {
  const { emailVerified, password, createdAt, updatedAt, ...rest } = user;
  return { ...rest };
}
