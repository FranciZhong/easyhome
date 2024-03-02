import prisma from "../libs/prismaClient";
import { convertReservation2CO } from "../types/reservation";

export interface QueryReservationOptions {
  propertyId?: string;
  userId?: string;
}

const getReservationList = async ({
  propertyId,
  userId,
}: QueryReservationOptions) => {
  let query: any = {};

  if (propertyId) {
    query.propertyId = propertyId;
  }

  if (userId) {
    query.userId = userId;
  }

  const reservations = await prisma.reservation.findMany({
    where: query,
    orderBy: {
      createdAt: "desc",
    },
  });

  return reservations.map(convertReservation2CO);
};

export default getReservationList;
