"use client";
import { getStockBySlug } from "@/actions/product/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
import clsx from "clsx";
import React, { useEffect } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = React.useState<number | null >(null);

  useEffect(() => {
    const getStock = async () => {
      const product = await getStockBySlug(slug);
      setStock(product);
    };
    getStock();
  }, []);

  return (
    <div className={clsx(
        `${titleFont.className} antialiased font-bold text-lg rounded`,
        {
            'bg-slate-200 text-slate-200 w-fit md:w-[150px]': stock === null
        }
    )}>
        <p>
           Stock: {stock}
        </p>
    </div>
  );
};
