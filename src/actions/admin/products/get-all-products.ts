'use server'

import prisma from "@/lib/prisma"

export const getAllProducts = async () => {
    try{
        //paginacioin, es decir pilla la page y el limit de los parametros
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