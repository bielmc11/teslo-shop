'use server'

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export const getAllOrders = async () => {
    
    try{
        const session = await auth()
        if(!session?.user) throw new Error('No hay sesión iniciada')
        if(session.user.role !== 'admin') throw new Error('No tienes permisos para ver los pedidos')
        
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