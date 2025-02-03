'use server'
import { revalidatePath } from "next/cache";

export const revalidatePaths = (paths: string[]) => {
    paths.forEach((path) => revalidatePath(path));
}