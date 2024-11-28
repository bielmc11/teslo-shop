import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

const credentialsProvider = Credentials({
    credentials: {
        emaill: { label: "Email", type: "email", placeholder: "usuraio@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
    },
    authorize: async (credentials) => {
        try {
            //TODO: 1- LLAMAR A UNA FUNCION QUE VERIFICA CON ZOD QUE TENGA EMAIL Y PASSWORD
            const pastCredentials = z
                .object({
                email: z.string().email(),
                password: z.string()
                })
                .safeParse(credentials);

            if(!pastCredentials.success) throw new Error('Invalid credentials')

                console.log(pastCredentials.success)

            const {email, password} = pastCredentials.data
                
             

            //TODO: 2- HACER UN HASH AL PASSWORD

            //TODO: 3- llAMAR A MI ACTION PARA HACER SIGN IN PASANDOLE EMAIL Y HASH PASSWORD

            //const user = await signInWithCredentials(email, password)
            //if(!user) throw new Error('User not found')
            const user = {name: 'John Doe', email: 'john@doe.com'}
            return user

        }catch(error){
            return null
        }
    }
})
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [credentialsProvider],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  }
})