import prisma from "../libs/prismaClient";
import { PropertyDetailCO, convertProperty2CO } from "../types/property";
import { convertUser2CO } from "../types/user";

const getPropertyByIds = async (propertyIds: string[]) => {
  const properties = await prisma.property.findMany({
    where: {
      id: {
        in: propertyIds,
      },
    },
    include: {
      user: true,
    },
  });

  const propertyCOList = properties.map((item) => {
    let propertyCO = convertProperty2CO(item) as PropertyDetailCO;
    propertyCO.user = convertUser2CO(item.user);

    return propertyCO;
  });

  return propertyCOList;
};

export default getPropertyByIds;
