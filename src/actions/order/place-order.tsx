"use server";

import { auth } from "@/auth";
import { Address } from "@/interfaces/address";
import { Size } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async ({
  productsToOrder,
  address,
}: {
  productsToOrder: ProductToOrder[];
  address: Address;
}) => {
  const session = await auth();

  console.log(session)
  console.log(session?.user?.userId)

  if (!session?.user) {
    return {
      ok: false,
      error: "No hay sesión iniciada",
    };
  }
  //obtener info de los productos,
  //Nota: puedo llevar 2 o + productos con mimso ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsToOrder.map((item) => item.productId),
      },
    },
  });

  //Calculo los precios
  const itemsInOrder = productsToOrder.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  //calculo los totales, subtotales y taxes
  const {
    subtotal: subTotal,
    taxes,
    total,
  } = productsToOrder.reduce(
    (acc, item) => {
      //La cantidad
      const quantity = item.quantity;
      //La info fiable de la BD (por el precio)
      const product = products.find((prod) => prod.id === item.productId);

      if (!product) throw `${item.productId} no existe - 500`;

      const subtotal = quantity * product.price;
      const taxes = subtotal * 0.15;
      const total = subtotal + taxes;

      return {
        subtotal: acc.subtotal + subtotal,
        taxes: acc.taxes + taxes,
        total: acc.total + total,
      };
    },
    { subtotal: 0, taxes: 0, total: 0 }
  );

  console.log({ subtotal: subTotal, taxes, total });

  //Crear la transaccion a la BD
  const prismaTx = await prisma.$transaction(async (tx) => {
    //1- Actualizo el sotck de los productos

    //2- Creo la orden -detalles
     const order = await tx.order.create({
      data: {
        userId: session.user.userId as string,
        itemsInOrder: itemsInOrder,
        subTotal: subTotal,
        tax: taxes,
        total: total,

        OrderItem: {
          createMany: {
            data: productsToOrder.map((item) => ({
              quantity: item.quantity,
              size: item.size,
              productId: item.productId,
              price: products.find((prod) => prod.id === item.productId)?.price ?? 0,
            })),
          },
        },
      },
    }); 
    //2.1 Miro si hay algujn price 0 y lanzo excepcion

    //3- Creo la direccion de la orden



     return {
      orden: order,
      updatedProducts: [],
      orderAdress: {}
    }  
  });

  return session.user;
};
