"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const getOrdersByUsers = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.userId,
      },
      include: {
        OrderAdress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return {
      ok: true,
      orders,
    };
  } catch (e: any) {
    return {
      ok: false,
      error: e.message,
    };
  }
};
