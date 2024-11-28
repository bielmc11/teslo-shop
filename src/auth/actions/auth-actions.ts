'use server'

import prisma from "@/lib/prisma"

const signInWithCredentials = async (email: string, password: string) => {
    if (!email || !password) {
        throw new Error('Email and password are required')
    }

    //const user = await prisma.user
}