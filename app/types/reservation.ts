import { Reservation } from "@prisma/client";

export type ReservationCO = Omit<
  Reservation,
  "createdAt" | "startAt" | "endAt"
> & {
  startAt: string;
  endAt: string;
};

export function convertReservation2CO(reservation: Reservation) {
  const { createdAt, startAt, endAt, ...rest } = reservation;
  return {
    ...rest,
    startAt: startAt.toISOString(),
    endAt: endAt.toISOString(),
  };
}
