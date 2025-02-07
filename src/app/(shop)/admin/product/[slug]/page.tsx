import { getProductBySlug } from "@/actions";
import { Title } from "@/components/inedx";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getAllCategories } from "@/actions/admin/products/get-all-categories";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [product, catergoriesData] = await Promise.all([
    getProductBySlug(slug),
    getAllCategories(),
  ]);

  const { ok, categories } = catergoriesData;



  if (!product && slug !== "new") {
    redirect(`/admin/products`);
  }

  if (!ok) {
    redirect(`/admin/products`);
  }

  return (
    <div>
      <Title title={product?.title ?? "Producto no encontrado"} />


    

    {/* /TODO! MIRAR TIPO PRODUCT */}
     <ProductForm product={product ?? {}} categories={categories!} />
    </div>
  );
}
