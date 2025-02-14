import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NamePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  //Creo que para que tenga mas info hay que hacer un callBack y en authjs y en el metodo signIn login o algo asi retornar el user con mas info llamando a prisma
  return (
    <div>
      <h2>Page Perfil Data</h2>
      <p>ID: {session.user?.id}</p>
      <p>Nome: {session.user?.name}</p>
      <p>
        {
          session.user?.role
        }
      </p>
      <div>
        {
          JSON.stringify(session.user)
        }
      </div>
    </div>
  );
}
