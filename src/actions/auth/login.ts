"use server";

import { signIn } from "@/auth";
import { sleep } from "@/utils/sleep";

//En esta funcion será la pasada en un useActionState

export async function authentificate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    //await sleep(2000);
    const { email, password } = Object.fromEntries(formData);

    await signIn("credentials", { email, password });

  } catch (error) {
    return "CredentialsSignin";
  }
}
