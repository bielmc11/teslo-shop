import { Title } from "@/components/inedx";
import Link from "next/link";
import { AddressForm } from "./ui/AddressForm";
import { getCountries } from "@/actions";


export  default async function AdressPage() {

  const contries = await getCountries()


  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={contries} />
        
      </div>
    </div>
  );
}