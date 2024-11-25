"use client";
import React from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onChangeQuantity: (value: number) => void;
}


export const QuantitySelector = ({ quantity, onChangeQuantity}: Props) => {



  return (
    <div className="flex items-center">
      <button onClick={() => {onChangeQuantity(-1)}}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>

      <button onClick={ () => {onChangeQuantity(1)}}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
