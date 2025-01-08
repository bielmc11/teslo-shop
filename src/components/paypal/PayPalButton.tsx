"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React from "react";

export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  const jaja = true

  return (
    <div className="flex justify-center w-full">
      {isPending ? (
        <div className="animate-pulse w-full">
          <div className='h-12 w-full bg-gray-300 rounded '> </div>
          <div className='h-12 w-full bg-gray-300 rounded mt-2 mb-8'> </div>
        </div>
      ) : (
        <PayPalButtons className="w-full" />
      )}
    </div>
  );
};
