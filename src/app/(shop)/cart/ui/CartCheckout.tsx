"use client";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const CartCheckout = () => {
  const { subTotal, tax, total, totalItems } = useCartStore(
    useShallow((state) => state.summaryCart())
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded && (
        <div>
          <h2 className="text-2xl mb-2">Resumen de pedido</h2>
          <div className="grid grid-cols-2">
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
            <span className="text-right mt-5 text-2xl"> {currencyFormat(total)}</span>
            {/* Hasta que lea cookies */}
          </div>

          <div className="mt-5 w-full flex justify-center mb-2">
            <Link
              className="btn-primary w-full text-center"
              href={"/checkout/adress"}
            >
              Chechout
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
