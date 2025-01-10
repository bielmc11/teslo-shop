"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import React from "react";
import { useParams } from "next/navigation";
import { paypalCheckPayment, setTransactionId } from "@/actions/index";

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

      //TODO guardar el id en la orden en la BD
      //setTransacctionId
      const { ok } = await setTransactionId(orderId, transactionId);
      if (!ok) throw new Error("No se puedo actualizar la orden");

      return transactionId;
    } catch (e) {
      console.log(e);
      return ''
    }
  };

  const onAprove = async (data: OnApproveData, actions: OnApproveActions) => {
    console.log('onAproveeee')
    const details = await actions.order?.capture()
    console.log('mis details para saber si me he metido bien son', details)
    
    if(!details) return
    
    //El details.id es el id de la transaccion que he creado antes aqui comprobare si esta pagado
    await paypalCheckPayment(details.id!)
  };

  return (
    <div className="flex justify-center w-full">
      {isPending ? (
        <div className="animate-pulse w-full">
          <div className="h-12 w-full bg-gray-300 rounded "> </div>
          <div className="h-12 w-full bg-gray-300 rounded mt-2 mb-8"> </div>
        </div>
      ) : (
        <PayPalButtons
          className="w-full"
          createOrder={createOrder}
          onApprove={onAprove}
        />
      )}
    </div>
  );
};
