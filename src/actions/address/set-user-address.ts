"use server";

import { Address } from "@/interfaces/address";
import prisma from "@/lib/prisma";
import { ok } from "assert";

export const setUserAddress = async (userId: string, address: Address) => {
  try {
    const saveAdress = await createOrReplaceUserAddress(userId, address);

    return {
      ok: true,
      message: "La direccion se ha guardado correctamente",
      data: saveAdress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo guardar la direccion",
    };
  }
};

const createOrReplaceUserAddress = async (userId: string, address: Address) => {
  try {
    //1-) Busco si la direccion existe
    const storeAddress = await prisma.userAddress.findFirst({
      where: {
        userId,
      },
    });

    const AddressToSave = {
      address: address.address,
      address2: address.address2,
      city: address.city,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      userId,
    };

    //2-) Si no existe, creo una nueva
    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: AddressToSave,
      });

      return newAddress;
    }

    //3-) Si existe, actualizo
    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: AddressToSave,
    });
    return {
      updatedAddress,
    };
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo guardar la direccion");
  }
};

export const deleteUserAddress = async (userId: string) => {
  try {
    const res = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });
    return {
      ok: true,
      message: "Se elimino la direccion",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la direccion",
    };
  }
};

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if(!address){
      return null
    }

    const { countryId, ...rest } = address

    return {
      ...rest,
      country: countryId
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
