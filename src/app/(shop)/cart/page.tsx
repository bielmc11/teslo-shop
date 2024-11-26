import {  Title } from "@/components/inedx";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { CartCheckout } from "./ui/CartCheckout";

//POR AHORA HASTA QUE MIREMOS COOKIES

export default function AdminPage() {

  return (
    <div className="flex justify-center items-center mb-72 px-4 sm:px-0 ">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Carrito" />

        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          {/* CARRITO */}
          <div className="flex flex-col ">
            <span className="text-xl">Agregar más itemms</span>
            <Link className="underline mb-5" href="/">
              Continúa comprando
            </Link>

            <ProductsInCart />


          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-2 md:min-h-[270px] sm:p-7 h-fit">
            <CartCheckout />
          </div>
        </div>
      </div>
    </div>
  );
}
