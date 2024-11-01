import { Product } from "@/interfaces/product.interface";
import React from "react";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10 ">
      {products.map((prodcut) => {
        return <ProductGridItem key={prodcut.slug} product={prodcut} />;
      })}
    </div>
  );
};
