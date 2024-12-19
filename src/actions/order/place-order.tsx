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

  if (!session?.user) {
    return {
      ok: false,
      error: "No hay sesión iniciada",
    };
  }
  ;

  //obtener info de los productos,
  //Nota: puedo llevar 2 o + productos con mimso ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsToOrder.map((item => item.productId))
      }
    }
  })

  //Calculo los precios
  const itemsInOrder = productsToOrder.reduce((acc, item) => {
    return acc + item.quantity
  },0)

  console.log(itemsInOrder)





  console.log( {productsToOrder, address, session } );
  return session.user;
};
