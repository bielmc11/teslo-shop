'use server'

import { z } from "zod"

const dataSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(255),

    price: z.coerce.number().min(0).transform((val) => val.toFixed(2)),
    inStock: z.coerce.number().min(0).transform((val) => val.toFixed(2)),
    
    categoryId : z.string().uuid(),
    sizes: z.coerce.string().transform((val) => val.split(",")),
    tags: z.string(),
    gender: z.enum(["men", "women", "kid", "unisex"]),




})

export const createUpdateProduct = async (formData: FormData) => {



    //? Como saco toda la info de un formdata en un solo objeto 
    const data = Object.fromEntries(formData);

    console.log(data)
    const parsedData = dataSchema.safeParse(data);

    console.log(parsedData)


    if(!parsedData.success){
        return {
            ok: false,
            error: parsedData.error
        }
    }



}