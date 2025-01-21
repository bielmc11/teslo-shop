"use server";

import { ProductsBD } from "@/app/(shop)/admin/product/[slug]/ui/ProductForm";
import prisma from "@/lib/prisma";
import { z } from "zod";
//Usar zod para validar los datos

export const updateProducts = async ( data: ProductsBD , oldSlug: string) => {

  const updatedData =  {
    ...data,
    price: Number(data.price),
  }
  
  const productSchema = z.object({
    title: z.string(),
    description: z.string(),
    images: z.array(z.string()),
    inStock: z.number(),
    price: z.number(),
    sizes: z.array(z.enum(["XS", "S", "M", "L", "XL", "XXL", "XXXL"])),
    slug: z.string(),
    tags: z.array(z.string()),
    gender: z.enum(["men", "women", "kid", "unisex"]),
    categoryId: z.string(),
  });

  try {
    const validatedData = productSchema.safeParse(updatedData);
    if (!validatedData.success) throw new Error("Error al validar los datos");
    
    console.log(typeof data.price)
    const updatedProduct = await prisma.product.update({
      where: {
        slug: oldSlug,
      },
      data : {
        title: validatedData.data.title,
        description: validatedData.data.description,
        inStock: validatedData.data.inStock,
        price: validatedData.data.price,
        sizes: validatedData.data.sizes,
        slug: validatedData.data.slug,
        tags: validatedData.data.tags,
        gender: validatedData.data.gender,

        categoryId: validatedData.data.categoryId,

        images: {
          createMany: {
            data: validatedData.data.images.map((image) => ({
              url: image,
            })),
            skipDuplicates: true,
          },
        },
      }
    });

    return {
      ok: true,
      product: updatedProduct,
    }
    // revalidate path
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: error,
    };
  }
};
