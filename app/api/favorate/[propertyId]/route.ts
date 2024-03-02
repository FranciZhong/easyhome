import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismaClient";
import { catchServerError } from "@/app/utils/httpHandler";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  propertyId: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Params },
) {
  return catchServerError(request, (req) => modifyFavorates(params, false));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  return catchServerError(request, (req) => modifyFavorates(params, true));
}

const modifyFavorates = async (params: Params, useRemove: boolean) => {
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

  let favoriteIds = currentUser.favoriteIds || [];
  if (useRemove) {
    favoriteIds = favoriteIds.filter((item) => item !== params.propertyId);
  } else {
    favoriteIds.push(params.propertyId);
  }

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json({
    success: true,
    message: "User avorates updated",
  });
};
