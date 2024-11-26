"use client";
import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import { QuantitySelector } from "@/components/inedx";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

export const ProductsInCart = () => {
  //Aqui vuelve a ocurrir un error de hidratacion por desajustes al coger info del localStorage
  const updateProductQuantity = useCartStore(state => state.upDateQuanity)
  const deleteProduct = useCartStore((state) => state.deleteItem)
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
            <Link className="hover:underline" href={`/product/${product.slug}`}>
               <p> {product.size} - {product.title}</p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector 
              quantity={product.quantity} 
              onChangeQuantity={(quantity) => {updateProductQuantity(product, quantity)}}
            />
            {/* POR AHORA TRES HASTA QUE MIREMOS COOKIES */}
            <button onClick={() => deleteProduct(product)} className="underline mt-3">Eliminar</button>
          </div>
        </div>
      ))}

      {
         (loaded && productsInCart.length <= 0) && <p>No hay productos</p>
      }
    </div>
  );
};
