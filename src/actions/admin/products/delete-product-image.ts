"use server";

import prisma from "@/lib/prisma";
export const deleteProductImage = async (id: number, imageUrl: string) => {

  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      message: "No se pudo eliminar imagenes de FS",
    };
  }

  const imageName = imageUrl.split("/").at(-1)?.split('.').at(0) ?? '';
  console.log(imageName);

  /* try {
    const res = await prisma.productImage.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (e) {
    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  } */
};
