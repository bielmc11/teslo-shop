"use server";

import prisma from "@/lib/prisma";

//Aqui haré server accions, recuerda que se puede hacer lo mimso haciendo endPoints y lueg en vez de server accions las funciiones que lo llamen como se hace tradicionalmente

interface PaginationOptions {
  take?: number;
  page?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 10,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 10;
  if (take < 1) take = 1;

  try {
    //1- Obtener los productos (paginados)
    const products = await prisma.product.findMany({
      take,
      skip: take * (page - 1),
      include: {
        images: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    //2- Paginas totales:
    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / take)


    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.images.map((image) => image.url),
      })),
    };
  } catch {
    throw new Error("Error al recuperar productos");
  }
};
