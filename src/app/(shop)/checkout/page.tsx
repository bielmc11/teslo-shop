import { Title } from "@/components/inedx";
import Link from "next/link";
import { ProductsInCart } from "./(checkout)/ui/ProductsInCart";

//POR AHORA HASTA QUE MIREMOS COOKIES

export default function NamePage() {

  return (
    <div className="flex justify-center items-center mb-72 px-4 sm:px-0 ">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Verificar orden" />

        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          {/* CARRITO */}
          <div className="flex flex-col ">
            <span className="text-xl">Ajustar elementos</span>
            <Link className="underline mb-5" href="/cart">
              Editar carrito
            </Link>

            {/* items del carrito */}

            <ProductsInCart />
          </div>

          {/* Checkout - Resumen de orden */}
          
        </div>
      </div>
    </div>
  );
}
