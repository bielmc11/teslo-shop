'use server'

import prisma from "@/lib/prisma"

export const getAllOrders = async () => {
    try{
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if(!orders) throw new Error('No se pudo obtener los pedidos')

        return { ok: true, orders }

    }catch(error){
        return { ok: false, error: error }
    }
}