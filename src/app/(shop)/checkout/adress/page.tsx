import { Title } from "@/components/inedx";
import { AddressForm } from "./ui/AddressForm";
import { getCountries } from "@/actions";
import { auth } from "@/auth";
import { getUserAddress } from "@/actions/address/set-user-address";


export  default async function AdressPage() {

  const contries = await getCountries()
  const session = await auth()

  const userId = session?.user.userId

  if(!userId){ 
    return <h3 className="text-center text-5xl ">500 - No tienes sesion activa</h3>
  }

  const myAdressStored = await getUserAddress(userId) as any ?? {}
  const {userId : user,...rest } =  myAdressStored

  


  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={contries} userId={userId} addressStored={rest} />
        
      </div>
    </div>
  );
}