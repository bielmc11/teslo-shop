import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { ProductGrid, Title } from "@/components/inedx";
//import { initialData } from "@/seed/seed";

//const products = initialData.products
interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products } = await getPaginatedProductsWithImages({ page });

  console.log("mis productos son: ", products[0]);

  return (
    <div>
      <Title title="tienda" subtitle="Todos los productos" classname="mb-2" />
      <ProductGrid products={products} />
    </div>
  );
}
