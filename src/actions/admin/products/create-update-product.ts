"use server";

import prisma from "@/lib/prisma";
import { Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const dataSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(455),
  slug: z.string().min(3).max(255),

  price: z.coerce
    .number()
    .min(0)
    .transform((val) => val.toFixed(2)),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => val.toFixed(2)),

  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.enum(["men", "women", "kid", "unisex"]),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const parsedData = dataSchema.safeParse(data);

  if (!parsedData.success) {
    console.log("error parsedData no funciono");

    console.log(parsedData.error);
    return {
      ok: false,
      error: parsedData.error,
    };
  }

  const product = parsedData.data;
  product.slug = product.slug.toLowerCase();

  const { id, inStock, price, ...rest } = product;
  
  try{
    const prismaTransaction = await prisma.$transaction(async (tx) => {
      let product: Product;


      const tagsArray = rest.tags
        .split(",")
        .map((tag) => JSON.parse(tag.trim().toLowerCase()));

        console.log(tagsArray);

        
        
  
      const processedList = rest.sizes.map((item) =>
        item.replace(/[\[\]"]/g, "")
      );
  
      if (id) {
        //si tengo id actualizar
        product = await tx.product.update({
          where: {
            id: id,
          },
          data: {
            ...rest,
            sizes: processedList as Size[],
            tags: tagsArray,
            inStock: Number(inStock),
            price: Number(price),
          },
        });
  
        console.log({ updatedProduct: product });
      } else {
        // si no tengo id crear
  
        console.log("creando producto");
        console.log(rest);
  
        product = await tx.product.create({
          data: {
            ...rest,
            inStock: Number(inStock),
            price: Number(price),
            sizes: processedList as Size[],
            tags: tagsArray
          },
        });
  
        console.log({ createdProduct: product });
      }

      return product;
    });

    console.log('creo que el problema puede vernir de aqui', product.slug)
    return {
      ok: true,
      product: prismaTransaction
    };

  }catch(e: any){
    console.log(e.message)

    return{
      ok: false,
      message: 'No se pudo actualizar/crear'
    }

  }


  //TODO si todo sale bien revlidate path

};
