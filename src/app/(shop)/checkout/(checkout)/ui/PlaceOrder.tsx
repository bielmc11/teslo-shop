"use client";
import { placeOrder } from "@/actions";
import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { sleep } from "@/utils/sleep";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  

  const { subTotal, tax, total, totalItems } = useCartStore(
    useShallow((state) => state.summaryCart())
  );

  
  //Para los problemas de hiratacion entrre servidor y cliente al usar el store con persistencia
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  if (!loaded) {
    return <p>Cargando...</p>;
  }
  
  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    //Lamar a la bd para hacer el orden
    await sleep(2000);
    const productsToOrder = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
    }));


    await placeOrder({ productsToOrder, address });

    setIsPlacingOrder(false);
  };

  return (
    <div>
      {loaded && (
        <div className="bg-white rounded-xl shadow-xl p-2 sm:p-7">
          <h2 className="text-2xl mb-2">Direaccion de entrega</h2>
          {/* FALAT SABER LA DIRECCION */}
          <div className="mb-5">
            <p className="font-bold text-xl">Fernando Herrera</p>
            <p>
              {" "}
              {address.firstName} {address.lastName}
            </p>
            <p>{address.address}</p>
            <p>{address.address2}</p>
            <p>{address.postalCode}</p>
            <p>
              {address.city}, {address.country}
            </p>
            <p>{address.phone}</p>
          </div>

          {/* divider */}
          <div className="w-full h-0.5 bg-gray-300 mb-5 rounded"></div>

          <h2 className="text-2xl mb-2">Resumen de pedido</h2>
          <div className="grid grid-cols-2 mb-4">
            <span>No. Productos</span>
            <span className="text-right"> {totalItems} </span>
            {/* Hasta que lea cookies */}

            <span>Subtotal</span>
            <span className="text-right"> {currencyFormat(subTotal)}</span>
            {/* Hasta que lea cookies */}

            <span>Impuestos (15%)</span>
            <span className="text-right"> {currencyFormat(tax)}</span>
            {/* Hasta que lea cookies */}

            <span className="mt-5 text-2xl">Total:</span>
            <span className="text-right mt-5 text-2xl">
              {" "}
              {currencyFormat(total)}
            </span>
          </div>

          <span>
            al haz click en &quot;Confirmar pedido&quot; aceptas nuestos{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>
            deprivacidad
          </span>

          <div className="mt-5 w-full flex justify-center mb-2">
            {/* <span className="text-red-500">Error en la creacion</span> */}
            <button
              onClick={onPlaceOrder}
              className={clsx(
                " w-full text-center",
                { "btn-primary": !isPlacingOrder },
                { "btn-disabled": isPlacingOrder }
              )}
              disabled={isPlacingOrder}
              //href={"/orders/123"}
            >
              Confirmar pedido {/* TODO AQUI SE ENVIA A LA BD */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
