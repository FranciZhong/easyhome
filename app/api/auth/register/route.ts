import prisma from "@/app/libs/prismaClient";
import { convertUser2CO } from "@/app/types/user";
import { catchServerError } from "@/app/utils/httpHandler";
import { HttpStatusCode } from "axios";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return catchServerError(request, async (req) => {
    const body = await request.json();
    const { email, name, password } = body;

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          success: false,
          message: `Email "${email}" is already registered. Please log in.`,
        },
        {
          status: HttpStatusCode.Conflict,
        },
      );
    }

    const encryptedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND),
    );

    user = await prisma.user.create({
      data: {
        email,
        name,
        password: encryptedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        user: convertUser2CO(user),
      },
    });
  });
}
