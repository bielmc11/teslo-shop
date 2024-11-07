import { Title } from "@/components/inedx";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  /* initialData.products[1],
  initialData.products[2], */
];

interface Props {
  params: {
    id: string;
  };
}
export default function OrderPage({ params }: Props) {
  const { id } = params;

  //TODO VERIFICAR
  //redirect()

  return (
    <div className="flex justify-center items-center mb-72 px-4 sm:px-0 ">
      <div className="flex flex-col w-[1000px] ">
        <Title title={`orden número ${id}`} />

        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          {/* CARRITO */}
          <div className="flex flex-col ">
            <div
              className={clsx(
                "flex items-center rounded py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2 ">Pendiente de pago</span>
              <span className="mx-2 ">Pago realizado</span>
            </div>

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

            <div className="mt-5 w-full flex justify-center mb-2">
              <div
                className={clsx(
                  "flex items-center rounded py-2 px-3.5 text-xs font-bold text-white mb-5 w-full",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2 ">Pendiente de pago</span>
                <span className="mx-2 ">Pago realizado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
