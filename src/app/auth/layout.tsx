import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const session = await auth()
  
   if(session?.user) {
    redirect('/')
  } 

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">
      {children}
      </div>
    </main>
  );
}