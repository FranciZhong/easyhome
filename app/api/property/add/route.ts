import Joi from "joi";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismaClient";
import { catchServerError } from "@/app/utils/httpHandler";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

const addPropertySchema = Joi.object({
  category: Joi.string().required(),
  address: Joi.string().required(),
  location: Joi.array().items(Joi.number()).required(),
  title: Joi.string().required().max(64),
  description: Joi.string().required().max(512),
  guestCount: Joi.number().integer().min(1),
  bedroomCount: Joi.number().integer().min(1),
  bathroomCount: Joi.number().integer().min(1),
  images: Joi.array().items(Joi.string()).required(),
  price: Joi.string().min(1),
});

export const POST = async (request: NextRequest) => {
  return catchServerError(request, async (req) => {
    const body = await req.json();

    try {
      await addPropertySchema.validateAsync(body);
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

    const propertyOptions = {
      ...body,
      price: parseInt(body.price, 10),
    };

    const property = await prisma.property.create({
      data: {
        ...propertyOptions,
        userId: currentUser.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        success: true,
        data: property,
      },
    });
  });
};
