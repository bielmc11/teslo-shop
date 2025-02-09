"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
    try{

        const product = await prisma.product.findUnique({
            where: {
                slug
            },
            include: {
               images : true
            }
        })



        if(!product) return null

        return {
            ...product,
            productImages: product.images,
            images: product.images.map((image) => image.url)
        }

    }catch{
        throw new Error('Error al recuperar producto')
    }

}