"use client";
import { deleteUserAddress, setUserAddress } from "@/actions/address/set-user-address";
import { Address } from "@/interfaces/address";
import { Countries } from "@/interfaces/product.interface";
import { useAddressStore } from "@/store/address/address-store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormInput = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string ;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAdress: boolean;
};
interface Props {
  countries: Countries[];
  userId?: string;
  addressStored?: Partial<Address> 
}
export const AddressForm = ({ countries, userId, addressStored = {} }: Props) => {
  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInput>({
    defaultValues: {
      ...addressStored,
      firstName: addressStored.firstName,
      rememberAdress: true
    }
  });

  const onSubmit = async (data: FormInput) => {
    const {rememberAdress, ...rest} = data
    setAddress(rest);

    if(rememberAdress){
      const res = await setUserAddress(userId as string, rest)
    }

    if(!data.rememberAdress){ //AQui debo eliminar la direccion
      const res = await deleteUserAddress(userId as string)
    }

    router.push("/checkout")
  };

  useEffect(() => {
    //ESTE RESET AHCE QUE SE QUITE EL DEFAULT VALUE
    if(!addressStored.firstName){
      reset(address);
    }
  }, [address.firstName]);

 
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <div className="flex flex-col mb-2">
        <span>Nombres</span>
        <input
          {...register("firstName", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Apellidos</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("lastName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección</span>
        <input
          {...register("address", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección 2 (opcional)</span>
        <input
          {...register("address2")}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Código postal</span>
        <input
          {...register("postalCode", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Ciudad</span>
        <input
          {...register("city", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>País</span>
        <select
          {...register("country", { required: true })}
          className="p-2 border rounded-md bg-gray-200"
        >
          <option value="">[ Seleccione ]</option>
          {countries.map((country) => {
            return (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Teléfono</span>
        <input
          {...register("phone", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2 sm:mt-10">
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              id="checkbox"
              {...register("rememberAdress")}
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>

          <span>¿Recordar Dirección?</span>
        </div>

        <button
          className={clsx(
            { "btn-primary flex w-full sm:w-1/2 justify-center ": isValid },
            { "btn-disabled flex w-full sm:w-1/2 justify-center ": !isValid }
          )}
          type="submit"
          disabled={!isValid}
        >
          Enviar por ahora
        </button>

        {/* <Link
          href="/checkout"
          className="btn-primary flex w-full sm:w-1/2 justify-center "
          >
          Siguiente
          </Link> */}
      </div>
    </form>
  );
};
