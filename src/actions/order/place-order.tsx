"use server";

import { auth } from "@/auth";
import { Address } from "@/interfaces/address";
import { Size } from "@/interfaces/product.interface";

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
    console.log("no hay sesion retorno error");
    return {
      ok: false,
      error: "No hay sesión iniciada",
    };
  }
  ;

  //console.log("mi sesion es: ", session.user);
  //console.log("el produ", productsToOrder);
  //console.log("la dirección: ", address);

  console.log( {productsToOrder, address, session } );
  return session.user;
};
