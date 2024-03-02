import prisma from "../libs/prismaClient";
import { PropertyDetailCO, convertProperty2CO } from "../types/property";
import { convertUser2CO } from "../types/user";

const getPropertyById = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      user: true,
    },
  });

  if (!property) {
    return null;
  }

  let propertyCO = convertProperty2CO(property) as PropertyDetailCO;
  propertyCO.user = convertUser2CO(property.user);

  return propertyCO;
};

export default getPropertyById;
