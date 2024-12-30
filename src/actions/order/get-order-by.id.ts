"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) throw new Error("No hay sesión iniciada");


  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAdress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,

                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error("No existe el pedido");

    if(session.user.role === 'user'){
        if(session.user.userId !== order.userId) throw new Error('No tienes permisos para ver este pedido');
    }

    return {
      ok: true,
      order,
    };
  } catch (e: any) {
    console.log(e.message)
    return {
      ok: false,
      error: e.message,
    };
  }
};
