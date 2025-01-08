import { getOrderById } from "@/actions/order/get-order-by.id";
import { PayPalButton, Title } from "@/components/inedx";
import { currencyFormat } from "@/utils/currencyFormat";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";



interface Props {
  params: {
    id: string;
  };
}
export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const myOrder = await getOrderById(id);

  const address = myOrder?.order?.OrderAdress;

  console.log(myOrder?.order?.itemsInOrder);

  if (!myOrder.ok) {
    redirect(`/`);
  }

  //TODO VERIFICAR
  //redirect()

  return (
    <div className="flex justify-center items-center mb-72 px-4 sm:px-0 ">
      <div className="flex flex-col w-[1000px] ">
        <Title title={`orden número ${id}`} />

        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          {/* CARRITO */}
          <div className="flex flex-col ">
            <div
              className={clsx(
                "flex items-center rounded py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": myOrder.order?.isPaid === false,
                  "bg-green-700": myOrder.order?.isPaid === true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2 ">
                {myOrder.order?.isPaid
                  ? "Pago realizado"
                  : "Pago pendiente de realizar"}
              </span>
            </div>

            {/* items del carrito */}

            {myOrder!.order!.OrderItem.map((item) => (
              <div key={item.product.slug} className="flex items-center mb-5">
                <Image
                  src={`/products/${item.product.images?.[0].url}`}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>{item.price} x {item.quantity}</p>
                  {/* FALTA LEER DE COOKIES CANTIDFAD */}
                  <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  {/* FALTA LEER DE COOKIES CANTIDFAD */}
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-2 sm:p-7">
            <h2 className="text-2xl mb-2">Direaccion de entrega</h2>
            {/* FALAT SABER LA DIRECCION */}
            <div className="mb-5">
            <p className="font-bold text-xl">Fernando Herrera</p>
            <p>
              {" "}
              {address!.firstName} {address!.lastName}
            </p>
            <p>{address!.address}</p>
            <p>{address!.address2}</p>
            <p>{address!.postalCode}</p>
            <p>
              {address!.city}, {address!.countryId}
            </p>
            <p>{address!.phone}</p>
          </div>


            {/* divider */}
            <div className="w-full h-0.5 bg-gray-300 mb-5 rounded"></div>

            <h2 className="text-2xl mb-2">Resumen de pedido</h2>
            <div className="grid grid-cols-2 mb-4">
              <span>No. Productos</span>
              <span className="text-right"> {myOrder.order?.itemsInOrder} Articulos</span>
              {/* Hasta que lea cookies */}

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(Number(myOrder.order?.subTotal))} </span>
              {/* Hasta que lea cookies */}

              <span>Impuestos (15%)</span>
              <span className="text-right"> {currencyFormat(Number(myOrder.order?.tax))} </span>
              {/* Hasta que lea cookies */}

              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right mt-5 text-2xl"> {currencyFormat(Number(myOrder.order?.total))} </span>
              {/* Hasta que lea cookies */}
            </div>

            <div className="mt-5 w-full flex justify-center mb-2 ">
             {/*  <div
                className={clsx(
                  "flex items-center rounded py-2 px-3.5 text-xs font-bold text-white mb-5 w-full",
                  {
                    "bg-red-500": myOrder.order?.isPaid === false,
                    "bg-green-700": myOrder.order?.isPaid === true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2 ">
                  {" "}
                  {myOrder.order?.isPaid
                    ? "Pago realizado"
                    : "Pago pendiente de realizar"}{" "}
                </span>
              </div> */}
              <PayPalButton 
              amount={myOrder.order!.total}
               orderId={myOrder.order!.id}
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
