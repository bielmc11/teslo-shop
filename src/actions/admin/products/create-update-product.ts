"use server";

import prisma from "@/lib/prisma";
import { Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateProducts } from "./update-products";
import { redirect } from "next/navigation";

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
  images: z.string().optional(),
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

  const { id, inStock, price,images, ...rest } = product;

  try {
    const prismaTransaction = await prisma.$transaction(async (tx) => {
      let product: Product;

      const tagsArray = rest.tags
        .split(",")
        .map((tag) => JSON.parse(tag.trim().toLowerCase()));

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
        
        //console.log({ updatedProduct: product });
        //TODO si todo sale bien revlidate path

        
      } else {
        // si no tengo id crear
        
        product = await tx.product.create({
          data: {
            ...rest,
            inStock: Number(inStock),
            price: Number(price),
            sizes: processedList as Size[],
            tags: tagsArray,
          },
        });
        
        console.log({ createdProduct: product });
      }
      
      return product;
    });
    
    
    if(images !== '[]'){
      console.log(JSON.parse(images!))
      const img = uploadImages(JSON.parse(images!));

    }

    return {
      ok: true,
      product: prismaTransaction,
    };
    
  } catch (e: any) {
    console.log(e.message);
    
    return {
      ok: false,
      message: "No se pudo actualizar/crear",
    };
  }
};



const uploadImages = async (images : File[]) => {
  console.log(images)
  try{

  }catch(e){
    
  }

}