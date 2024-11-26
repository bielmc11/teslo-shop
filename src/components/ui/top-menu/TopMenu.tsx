"use client";
import { titleFont } from "@/config/fonts";
import { uiSideBar } from "@/store";
import { useCartStore } from "@/store/cart/cart-store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const router = useRouter();

  const changeIsOpen = uiSideBar((state) => state.changeIsOpen);
  const totalItemsCart = useCartStore((state) => state.getTotalItems());

  //Para solucionar los errores de hidratacionm
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  },[])

  return (
    <nav className="flex px-5 justify-between items-center w-full h-16 bg-gray-100 ">
      {/* logo */}
      <div>
        <Link href="/?page=1">
          <span className={`${titleFont.className} antialiased font-bold`}>
            TESLO
          </span>
        </Link>
        <span> | Shop </span>
      </div>
      {/* center Menu */}
      <div className="hidden sm:block ">
        <Link
          href={"/gender/men"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-300"
        >
          Hombres
        </Link>
        <Link
          href={"/gender/women"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-300"
        >
          Mujeres
        </Link>
        <Link
          href={"/gender/kid"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-300"
        >
          Niños
        </Link>
      </div>

      {/* Search card and menu */}
      <div className="flex items-center gap-4">
        <Link href="/search">
          <IoSearchOutline
            className="text-gray-500 hover:text-gray-700 transition-all"
            size={24}
          />
        </Link>

        <Link href={(totalItemsCart === 0 && loaded) 
          ? "/empty"
          : "/cart"
        } className="p-1">
          <div className="relative">
            { loaded && (totalItemsCart > 0) && (
              <span className="absolute -top-3 -right-1 bg-blue-700 text-white font-bold  text-xs px-1 rounded-full fade-in">
                {totalItemsCart}
              </span>
            )}

            <IoCartOutline
              className="text-gray-500 hover:text-gray-700 transition-all"
              size={24}
            />
          </div>
        </Link>

        <button
          className="p-2 rounded-md transition-all hover:bg-gray-300"
          onClick={() => changeIsOpen()}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
