'use client'
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Product } from "@/interfaces/product.interface";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
    const [first,setFirst] = useState(product?.images[0])

    const onMouseOver = () => {
        setFirst(product.images[1])
    }
    
    const onMouserOut = () => {
        setFirst(product.images[0])
    }

  return (
    <div 
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouserOut}
        className="rounded-md overflow-hidden fade-in group"
    >
      <Link href={`/product/${product.slug}`}>
        <ProductImage
          src={first}
          alt={product.title}
          className="w-full object-cover rounded-md"
          width={500}
          height={500}
        />
      </Link>

      <div className="p-4 flex flex-col" >
        <Link className="hover:text-blue-600 group-hover:text-blue-600" href={`/product/${product.slug}`}>{product.title}</Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
