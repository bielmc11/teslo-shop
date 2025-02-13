"use server";

import { signIn } from "@/auth";

export async function authentificate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
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