import { ProductGrid, Title } from "@/components/inedx";
import { categories } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const getProductsByCategory = (category: string) => {
  return initialData.products.filter((product) => product.gender === category);
};

//TODO ! FALTA POR PONER CADA CUANTO QUIERO VOVLER A REQCONTRUIR LA PAGINA EN CACHE (ARRIBA DE LA PGINA O EN LA FUNCION GETSTATICPARAMS)

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const products = getProductsByCategory(id);

  const label: Record<categories, string> = {
    men: "para Hombre",
    women: "para Mujer",
    kid: "para Niños",
    unisex: "para Todos",
  };

  //Tenhgo que ver como hacerlo mejor
  if (id !== "men" && id !== "women" && id !== "kid") {
    return notFound();
  }
  return (
    <div>
      <Title
        title={`Articulos de ${label[id]}`}
        subtitle="Todos los productos"
      />
      <ProductGrid products={products} />
    </div>
  );
}
