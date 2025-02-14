"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  //1- obtengo el token para hacer la llamda
  const authToken = await getPaypalBearerToken();

  if (!authToken) return { ok: false, message: "No se pudo obtener el token" };

  //2- Hago la llamada para ver la info de mi transaccion
  const res = await verifyPaypalPayment(transactionId, authToken);

  if (!res) return { ok: false, message: "Error al verificar la transaccion" };

  const { status, purchase_units } = res;
  const { invoice_id } = purchase_units[0];

  if (status !== "COMPLETED")
    return { ok: false, message: "No se ha pagado la orden" };

  try {
    //TODO:
    //1-) Sacar el boton si ya esta pagado
    //2-) el id lo tengo que mandar tambien pillado de la URL params creo
    await prisma.order.update({
      where: {
        //TODO CAMBIAR ESTE ID POR EL QUE SACARE DE LA INFO DE LA LLAMADA A AL TRANSACCION
        id: invoice_id,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    //REvalido el path
    revalidatePath(`/orders/${invoice_id}`);

    return { ok: true, message: "Transaccion pagada correctamente" };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "Error al actualizar la BD",
    };
  }

  //TODO revalidar un path para que next js refresque la pagina
};

const getPaypalBearerToken = async () => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const resul = await fetch(oauth2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((res) => res.json());
    return resul.access_token;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const verifyPaypalPayment = async (
  transactionId: string,
  barerToken: string
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${barerToken}`);

  const paypalOrderUrl = process.env.PAYPAL_ORDERS_URL ?? "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const res = await fetch(`${paypalOrderUrl}/${transactionId}`, {
      ...requestOptions,
      cache: "no-store",
    });
    //Me falta el return joder
    return res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};
