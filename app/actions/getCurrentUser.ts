import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "../libs/prismaClient";

export async function getSession() {
  return await getServerSession(authOptions);
}

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    return user;
  } catch (err: any) {
    console.error(err);
    return null;
  }
};

export default getCurrentUser;
