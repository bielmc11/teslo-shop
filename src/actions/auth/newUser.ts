'use server'

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const newUser = async (email: string,name: string, password: string) => {
    try{
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: bcrypt.hashSync(password),
            },select: {
                id: true,
                name: true,
                email: true,
            }
        })

        //const {  id, name, email, password } = user

        return {
            ok: true,
            message: 'Usuario creado',
            user
        }

    }catch(error){
        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }
}