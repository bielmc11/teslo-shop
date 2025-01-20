'use server'

import prisma from "@/lib/prisma"

export const getAllProducts = async () => {
    try{
        const products = await prisma.product.findMany({
            include: {
                images: true
            },
            take: 10
        })
        return {
            ok: true,
            products
        }

    }catch(error){
        return {
            ok: false,
            message: 'No se pudo obtener los productos'
        }
    }
}