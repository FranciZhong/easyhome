import { Property } from "@prisma/client";
import { UserCO } from "./user";

export type PropertyCO = Omit<Property, "createAt">;

export type PropertyDetailCO = PropertyCO & {
  user: UserCO;
};

export function convertProperty2CO(property: Property): PropertyCO {
  const { createAt, ...rest } = property;
  return { ...rest };
}
