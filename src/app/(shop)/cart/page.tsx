import {  Title } from "@/components/inedx";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";

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
          <div className="bg-white rounded-xl shadow-xl p-2 sm:p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de pedido</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 Articulos</span>
              {/* Hasta que lea cookies */}

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              {/* Hasta que lea cookies */}

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 15</span>
              {/* Hasta que lea cookies */}

              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right mt-5 text-2xl">$ 115</span>
              {/* Hasta que lea cookies */}
            </div>

            <div className="mt-5 w-full flex justify-center mb-2">
              <Link
                className="btn-primary w-full text-center"
                href={"/checkout/adress"}
              >
                Chechout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
