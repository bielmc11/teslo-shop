import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { ProductGrid, Title } from "@/components/inedx";
import { initialData } from "@/seed/seed";

//const products = initialData.products

export default async function Home() {
  const { products } = await getPaginatedProductsWithImages();

  return (
    <div>
      <Title title="tienda" subtitle="Todos los productos" classname="mb-2" />
       <ProductGrid products={products} /> 
    </div>
  );
}
