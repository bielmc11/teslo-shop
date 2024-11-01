import { ProductGrid, Title } from "@/components/inedx";
import { initialData } from "@/seed/seed";

const products = initialData.products

export default function Home() {
  return (
    <div>
      <Title title='tienda' subtitle="Todos los productos" classname="mb-2"/>
      <ProductGrid products={products} />
    </div>
  );
}
