import { QuantitySelector, Title } from "@/components/inedx";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

//POR AHORA HASTA QUE MIREMOS COOKIES
const productsInCart = [
  initialData.products[0],
  /* initialData.products[1],
  initialData.products[2], */
];

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

            {/* items del carrito */}

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex items-center mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={1} />{" "}
                  {/* POR AHORA TRES HASTA QUE MIREMOS COOKIES */}
                  <button className="underline mt-3">Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-2 sm:p-7">
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
                href={'/checkout/adress'}>Chechout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
