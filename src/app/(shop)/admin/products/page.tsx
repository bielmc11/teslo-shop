import { getAllProducts, getPaginatedProductsWithImages } from "@/actions";
import { Title } from "@/components/inedx";
import { MyPagination } from "@/components/pagination/Pagination";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { currencyFormat } from "@/utils/currencyFormat";
import Image from "next/image";
import Link from "next/link";

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function NamePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { totalPages, currentPage, products } =
    await getPaginatedProductsWithImages({ page });

  return (
    <div>
      <Title title="Mantenimiento de Productos" />
      <div className="flex max-w-[1600px] flex-col mx-auto ">
        <Link
          href="/admin/product/new"
          className="btn-primary sm:max-w-[150px] self-end mb-4"
        >
          Nuevo producto
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
                      <ProductImage
                        width={120}
                        height={120}
                        alt={product.title}
                        //src={`/products/${product.images[0]}`}
                        src={product?.images[0]}
                        className="object-contain rounded"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={`/admin/product/${product.slug}`}
                      className="hover:underline"
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className="font-medium">
                    {currencyFormat(product.price)}
                  </td>
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
        <MyPagination totalPages={totalPages} page={currentPage} />
      </div>
    </div>
  );
}
