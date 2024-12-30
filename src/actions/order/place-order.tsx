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

interface AddressBd extends Address {
  id: string;
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

  //obtener info de los productos,
  //Nota: puedo llevar 2 o + productos con mimso ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsToOrder.map((item) => item.productId),
      },
    },
  });  

  //Calculo la cantidad
  const itemsInOrder = productsToOrder.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  //calculo los totales, subtotales y taxes
  const { subTotal, taxes, total } = productsToOrder.reduce(
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
        subTotal: acc.subTotal + subtotal,
        taxes: acc.taxes + taxes,
        total: acc.total + total,
      };
    },
    { subTotal: 0, taxes: 0, total: 0 }
  );

  //Crear la transaccion a la BD
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1- Actualizo el sotck de los productos
      const updatedProductsPromises = products.map(async (item) => {
        //Acumular los valores
        const productQuantity = productsToOrder
          .filter((p) => p.productId === item.id)
          .reduce((acc, now) => acc + now.quantity, 0);

        if (productQuantity <= 0) {
          throw new Error(`${item.id} no tiene canitdad definida`);
        }

        return tx.product.update({
          where: { id: item.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      //Ya tengo los valores post updates
      const updatedProducts = await Promise.all(updatedProductsPromises);

      //Verifico valores negarivos === no hay stock
      updatedProducts.forEach((item) => {
        if (item.inStock < 0) {
          throw new Error(`${item.title} no tiene stock`);
        }
      });

      //2- Creo la orden - detalles
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
                price:
                  products.find((prod) => prod.id === item.productId)?.price ??
                  0,
              })),
            },
          },
        },
      });
      //2.1 Miro si hay algujn price 0 y lanzo excepcion

      //3- Creo la direccion de la orden
      const { country ,id, ...restAddress } = address as AddressBd ;
      const orderAdress = await tx.orderAdress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        orden: order,
        orderAdress: orderAdress,
        updatedProducts: updatedProducts,
      };
    });

    return {
      ok: true,
      message: "Order created",
      order: prismaTx.orden.id,
      prismaTx: prismaTx,
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      ok: false,
      message: e?.message,
    };
  }
};
