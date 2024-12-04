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
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    return 'success';

  } catch (error) {

    if((error as any).type === 'CredentialsSignin') return 'CredentialsSignin';
     
    return "error desconocido ";
  }
}


export async function login (email: string, password: string) {
  try{
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    return 'success';

  }catch(error){
    if((error as any).type === 'CredentialsSignin') return 'CredentialsSignin';
    return "error desconocido ";
  }
}