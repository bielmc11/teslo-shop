"use server";

import { signIn } from "@/auth";

//En esta funcion será la pasada en un useActionState

export async function authentificate(prevState: string | undefined, formData: FormData) {
  try {
    console.log(Object.fromEntries(formData));
    await signIn("credentials", Object.fromEntries(formData));

  } catch (error) {
    return "error";
  }
}
