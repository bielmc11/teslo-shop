"use client";
import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { currencyFormat } from "@/utils/currencyFormat";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    setLoaded(true)
  },[])

 /*  if(!loaded){
    return <p>Cargando...</p>
  } */
  return (
    <div className={clsx(
      ' bg-transparent',
      {'bg-slate-50 rounded-md md:max-w-[400px] md:min-h-[500px]' : !loaded}
    )}>
      {/* items del carrito */}

      {  (loaded && productsInCart.length > 0) &&   productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex items-center mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <div >
               <p> {product.size} - {product.title} ({product.quantity})</p>
            </div>
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
 
            {/* POR AHORA TRES HASTA QUE MIREMOS COOKIES */}
          </div>
        </div>
      ))}

      {
         (loaded && productsInCart.length <= 0) && <p>No hay productos</p>
      }
    </div>
  );
};
