'use server'

import prisma from "@/lib/prisma"

export const getAllCategories = async () => {
    try{
        const res = await prisma.category.findMany()
        return {
            ok: true,
            categories: res
        }

    }catch(error){
        return {
            ok: false,
            message: 'No se pudo obtener las categorías'
        }
    }
}