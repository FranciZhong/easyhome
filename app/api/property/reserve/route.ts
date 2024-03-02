import getCurrentUser from "@/app/actions/getCurrentUser";
import getPropertyById from "@/app/actions/getPropertyById";
import prisma from "@/app/libs/prismaClient";
import { catchServerError } from "@/app/utils/httpHandler";
import { HttpStatusCode } from "axios";
import { differenceInDays } from "date-fns";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

const reservationSchema = Joi.object({
  propertyId: Joi.string().required(),
  startAt: Joi.string().isoDate(),
  endAt: Joi.string().isoDate(),
});

export async function POST(request: NextRequest) {
  return catchServerError(request, async (req) => {
    const body = await req.json();

    try {
      await reservationSchema.validateAsync(body);
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        {
          success: false,
          message: "Bad request.",
        },
        { status: HttpStatusCode.BadRequest },
      );
    }

    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Log in to continue.",
        },
        { status: HttpStatusCode.Unauthorized },
      );
    }

    const property = await getPropertyById(body.propertyId);
    if (!property || property.userId === currentUser.id) {
      console.error(`Bad request from owner: ${currentUser.id}`);
      return NextResponse.json(
        {
          success: false,
          message: "Bad request.",
        },
        { status: HttpStatusCode.BadRequest },
      );
    }

    const totalDays = differenceInDays(
      new Date(body.endAt),
      new Date(body.startAt),
    );
    if (totalDays < 1) {
      console.error(
        `Bad request with total days: ${totalDays} from body: ${JSON.stringify(body)}`,
      );
      return NextResponse.json(
        {
          success: false,
          message: "Bad request.",
        },
        { status: HttpStatusCode.BadRequest },
      );
    }

    // skip checking availability and concurrent issues for ease
    // can add a distributed lock based on redis
    // check the availability

    await prisma.reservation.create({
      data: {
        ...body,
        userId: currentUser.id,
        totalPrice: totalDays * property.price,
      },
    });

    return NextResponse.json({
      success: true,
    });
  });
}
