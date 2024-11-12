"use server";

import prisma from "@/lib/prisma";

//Aqui haré server accions, recuerda que se puede hacer lo mimso haciendo endPoints y lueg en vez de server accions las funciiones que lo llamen como se hace tradicionalmente

export const getPaginatedProductsWithImages = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    return {
      products: products.map((product) => ({
        ...product,
        images: product.images.map((image) => image.url),
      })),
    };
  } catch {
    throw new Error("Error al recuperar productos");
  }
};
