'use client'
import { Product } from "@/interfaces/product.interface";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
    const [first,setFirst] = useState(product.images[0])

    const onMouseOver = () => {
        console.log('encimaaaaaaaaaa')
        setFirst(product.images[1])
    }
    
    const onMouserOut = () => {
        console.log('saliiiiiiiiiiiiii')
        setFirst(product.images[0])
    }

  return (
    <div 
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouserOut}
        className="rounded-md overflow-hidden fade-in"
    >
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${first}`}
          alt={product.title}
          className="w-full object-cover rounded-md"
          width={500}
          height={500}
        />
      </Link>

      <div className="p-4 flex flex-col" >
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>{product.title}</Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
