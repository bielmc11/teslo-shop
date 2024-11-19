export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components/inedx";
import { categories } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import { notFound, redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import { MyPagination } from "@/components/pagination/Pagination";

interface Props {
  params: {
    gender: Gender;
  };
  searchParams: {
    page?: string;
  };
}

/* const getProductsByCategory = (category: string) => {
  return initialData.products.filter((product) => product.gender === category);
}; */

//TODO ! FALTA POR PONER CADA CUANTO QUIERO VOVLER A REQCONTRUIR LA PAGINA EN CACHE (ARRIBA DE LA PGINA O EN LA FUNCION GETSTATICPARAMS)

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;

  const prePagepage = await searchParams?.page;

  const page = prePagepage ? parseInt(prePagepage) : 1;

  //const products = getProductsByCategory(gender);

  const { products, totalPages, currentPage } =
    await getPaginatedProductsWithImages({ page, gender });

  const label: Record<string, string> = {
    men: "para Hombre",
    women: "para Mujer",
    kid: "para Niños",
    unisex: "para Todos",
  };

  //Tenhgo que ver como hacerlo mejor
  if (gender !== "men" && gender !== "women" && gender !== "kid") {
    return notFound();
  }

  if (products.length === 0) {
    return redirect(`/gender/${gender}`);
  }
  return (
    <div>
      <Title
        title={`Articulos de ${label[gender]}`}
        subtitle={`Todos los productos ${label[gender]} `}
      />

      <ProductGrid products={products} />
      <MyPagination totalPages={totalPages} page={page} />
    </div>
  );
}

//TODO:
// 0. Cambiar category/[id] gender/[gender] ====> y todos los params que dependen de este

// 1. TRAER LOS PRRODUCTOS DE UNA ACCTIONS

// 2. HACER PAGINATION
//2.1 MANDAR A FUNCION DE UTILS generationpagination