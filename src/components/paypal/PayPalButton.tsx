"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";
import React from "react";
import { useParams } from "next/navigation";
import { setTransactionId } from "@/actions/index";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round(amount * 100) / 100;

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    try {
      const transactionId = await actions.order.create({
        intent: "CAPTURE",
        purchase_units: [
          {
            //reference_id: order_id
            //invoice_id: orderId
            amount: {
              value: `${roundedAmount}`,
              currency_code: "USD",
            },
          },
        ],
      });

      //TOD guiardar el id en la orden en la BD
      //setTransacctionId
     const { ok } = await setTransactionId(orderId, transactionId);
     if(!ok) throw new Error('No se puedo actualizar la orden')

      return transactionId;
    } catch (e) {
      return "";
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center w-full">
      {isPending ? (
        <div className="animate-pulse w-full">
          <div className="h-12 w-full bg-gray-300 rounded "> </div>
          <div className="h-12 w-full bg-gray-300 rounded mt-2 mb-8"> </div>
        </div>
      ) : (
        <PayPalButtons className="w-full" createOrder={createOrder} />
      )}
    </div>
  );
};
