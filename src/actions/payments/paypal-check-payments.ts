"use server";

import prisma from "@/lib/prisma";

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPaypalBearerToken();

  console.log("authToken", authToken);

  if (!authToken) return { ok: false, message: "No se pudo obtener el token" };

  const res = await verifyPaypalPayment(transactionId, authToken);

  console.log('la segunda funcion es', res);

  if (!res) return { ok: false, message: "Error al verificar la transaccion" };

  const { status, purchase_units } = res;
  console.log(status);
  console.log(purchase_units);
  //const {} = purchase_units[0] //TODO:

  if(status !== "COMPLETED") return { ok: false, message: "No se ha pagado la orden" }

  //TODO actualziar la BD para que ponga isPaid true

  try{ //TODO: 
         //1-) Sacar el boton si ya esta pagado
         //2-) el id lo tengo que mandar tambien pillado de la URL params creo
    await prisma.order.update({
      where: {
        id:'704759ab-2e47-4ebe-90b9-828e92dff3ae' ,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      }
    })

  }catch(e){
    console.log(e);
    return {
      ok: false,
      message: "Error al actualizar la BD",
    }
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
    }).then((res) =>
      res.json()
    );
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

  console.log(transactionId, barerToken);

  const paypalOrderUrl = process.env.PAYPAL_ORDERS_URL ?? "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const res = await fetch(
      `${paypalOrderUrl}/${transactionId}`,
      {
        ...requestOptions,
        cache: "no-store",
      }
    );
    //Me falta el return joder
    return res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};
