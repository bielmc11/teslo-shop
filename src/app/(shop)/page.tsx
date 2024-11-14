import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { ProductGrid, Title } from "@/components/inedx";
import { ProductPagination } from "@/components/pagination/ProductPagiantion";
//import { initialData } from "@/seed/seed";

//const products = initialData.products
interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages, currentPage } =
    await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <div>
      <Title title="tienda" subtitle="Todos los productos" classname="mb-2" />
      <ProductGrid products={products} />
      <div className="flex justify-center gap-2 mb-20">
        <ProductPagination page={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
