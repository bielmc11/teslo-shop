import { Title } from "@/components/inedx";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

//POR AHORA HASTA QUE MIREMOS COOKIES
const productsInCart = [
  initialData.products[0],
  /* initialData.products[1],
  initialData.products[2], */
];
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
                  <p>${product.price} x 3</p>
                  {/* FALTA LEER DE COOKIES CANTIDFAD */}
                  <p className="font-bold">Subtotal: {product.price * 3}</p>
                  {/* FALTA LEER DE COOKIES CANTIDFAD */}
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-2 sm:p-7">
            <h2 className="text-2xlmb-2">Direaccion de entrega</h2>
            {/* FALAT SABER LA DIRECCION */}
            <div className="mb-5">
              <p className="font-bold">Fernando Herrera</p>
              <p>Av inventada</p>
              <p>Barcelona</p>
              <p>cataluña</p>
              <p>64343432425</p>
            </div>

            {/* divider */}
            <div className="w-full h-0.5 bg-gray-300 mb-5 rounded"></div>

            <h2 className="text-2xl mb-2">Resumen de pedido</h2>
            <div className="grid grid-cols-2 mb-4">
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

            <span>
              al haz click en &quot;Confirmar pedido&quot; aceptas nuestos{" "}
              <a href="#" className="underline">
                términos y condiciones
              </a>
                deprivacidad 
            </span>

            <div className="mt-5 w-full flex justify-center mb-2">
              <Link
                className="btn-primary w-full text-center"
                href={"/orders/123"}
              >
                Confirmar pedido {/* TODO AQUI SE ENVIA A LA BD */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
