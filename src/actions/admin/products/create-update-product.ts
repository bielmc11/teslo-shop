"use server";

import prisma from "@/lib/prisma";
import { Product, Size } from "@prisma/client";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME ?? "",
  api_key: process.env.CLOUDINARY_API_KEY ?? "",
  api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
});

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
      } else {
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

    //TODO TENGO QUE VER CUANDO NO MANDO IMAGES QUE PASA DE VERDAD

    if (formData.getAll("images")) {
      const img = await uploadImages(formData.getAll("images") as File[]);
      if (img) {
        await prisma.productImage.createMany({
          data: img.map((image) => ({
            url: image!,
            productId: product.id!,
          })),
        });
      }
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

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        const mimeType = image.type ?? "image/png";

        return cloudinary.uploader
          .upload(`data:${mimeType};base64,${base64Image}`, {
            resource_type: "image",
          })
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
