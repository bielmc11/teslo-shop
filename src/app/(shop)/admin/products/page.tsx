import { getAllProducts } from "@/actions";
import { Title } from "@/components/inedx";
import { currencyFormat } from "@/utils/currencyFormat";
import Image from "next/image";
import Link from "next/link";

export default async function NamePage() {
  const { ok, products } = await getAllProducts();

  //TODO hacer paginacion

  return (
    <div>
      <Title title="Mantenimiento de Productos" />
      <div className="flex max-w-[1600px] flex-col mx-auto ">
        <Link
          href="/admin/newProducts"
          className="btn-primary sm:max-w-[150px] self-end mb-4"
        >
          Nuevo producto{" "}
        </Link>
        <table>
          <thead className="bg-gray-200 border-b h-10">
            <tr className="text-left">
              <th>Imagen</th>
              <th>Titulo</th>
              <th>Precio</th>
              <th>Genero</th>
              <th>Inventario</th>
              <th>Tallas</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              return (
                <tr key={product.id} className="border-b-4 border-gray-200">
                  <td>
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={`/products/${product.images[0].url}`}
                        width={120}
                        height={120}
                        alt="producto"
                        className="object-contain rounded"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                      {product.title}
                    </Link>
                  </td>
                  <td className="font-medium">{currencyFormat(product.price)}</td>
                  <td>{product.gender}</td>
                  <td className="font-medium">{product.inStock}</td>
                  <td className="font-medium">
                    {product.sizes.map((size) => (
                      <span key={size}> {size}</span>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
