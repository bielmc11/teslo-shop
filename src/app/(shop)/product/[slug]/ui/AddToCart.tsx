"use client";
import { QuantitySelector, SizeSelector } from "@/components/inedx";
import { CartProduct, Product, Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/cart-store";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore((state) => state.addToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [errorMesage, setErrorMesage] = useState<string | undefined>();

  const onChangeQuantity = (value: number) => {
    if(quantity + value < 1) return
    setQuantity((prevQuantity) => prevQuantity + value);
  };

  const addToCart = () => {
    if (!size) {setErrorMesage("Selecciona una talla"); return}
    
    const cartProduct : CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      quantity: quantity,
      price: product.price,
      size: size,
      image: product.images[0]
    }

    addProductToCart(cartProduct)
    setSize(undefined)
    setQuantity(1)

  }

 

  return (
    <>
    {
        errorMesage && <p className="text-red-500 fade-in">{errorMesage}</p>
    }
      <SizeSelector
        onChangeSize={setSize}
        selectedSize={size}
        availableSizes={product.sizes}
      />

      {/* selector de cantidad */}
      <QuantitySelector
        onChangeQuantity={onChangeQuantity}
        quantity={quantity}
      />

      <button onClick={addToCart} className="btn-primary my-5">Agregar al carrito</button>
    </>
  );
};



