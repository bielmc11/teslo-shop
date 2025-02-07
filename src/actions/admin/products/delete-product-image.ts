"use server";
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
export const deleteProductImage = async (id: number, imageUrl: string) => {

  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      message: "No se pudo eliminar imagenes de FS",
    };
  }

  const imageName = imageUrl.split("/").at(-1)?.split('.').at(0) ?? '';
  console.log(imageName);

  //1- eliminar de mi BD
  //2-Eliminar de cloudinaryu con uplader.destroy
  //3-Revaldiar path

  try {
    await cloudinary.uploader.destroy(imageName);

    const imageDeleted = await prisma.productImage.delete({
      where: {
        id,
      },
      select: {
        product: {
          select: {
            slug: true,
          }
        }
      }
    });

    //REVIDSAT LOS PATH
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${imageDeleted.product.slug}`);
    revalidatePath(`/product/${imageDeleted.product.slug}`);



  } catch (e) {
    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  } 
};
