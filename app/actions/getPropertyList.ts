import prisma from "@/app/libs/prismaClient";
import { convertProperty2CO } from "../types/property";

export interface QueryPropertyOptions {
  category?: string;
  longitude?: number;
  latitude?: number;
  bedroomMin?: number;
  bathroomMin?: number;
  guestMin?: number;
  startDate?: string;
  endDate?: string;
}

const getPropertyList = async ({
  category,
  longitude,
  latitude,
  bedroomMin,
  bathroomMin,
  guestMin,
  startDate,
  endDate,
}: QueryPropertyOptions) => {
  let query: any = {};

  if (category) {
    query.category = category;
  }

  // Prisma does not support geo filtering
  // todo fix this

  // if (longitude && latitude) {
  //   query.location = {
  //     $near: {
  //       $geometry: {
  //         type: "Point",
  //         coordinates: [longitude, latitude], // Target point coordinates
  //       },
  //       $maxDistance: 5000,
  //     },
  //   };
  // }

  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          startAt: { lt: endDate },
          endAt: { gt: startDate },
        },
      },
    };
  }

  if (bedroomMin) {
    query.bedroomCount = {
      gte: +bedroomMin,
    };
  }

  if (bathroomMin) {
    query.bathroomCount = {
      gte: +bathroomMin,
    };
  }

  if (guestMin) {
    query.guestCount = {
      gte: +guestMin,
    };
  }

  const propertyList = await prisma.property.findMany({
    where: query,
    orderBy: {
      createAt: "desc",
    },
  });

  return propertyList.map(convertProperty2CO);
};

export default getPropertyList;
