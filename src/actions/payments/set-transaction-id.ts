"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
 
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if(!order) throw new Error(`No se encontró la orden ${orderId}`)

    return {
      ok: true,
      message: "transactionId seteado",
    };
  } catch (e: any) {
    return {
      ok: false,
      message: e.message,
    };
  }
};
