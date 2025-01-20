import { getProductBySlug } from "@/actions";
import { Title } from "@/components/inedx";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props{
    params: {
        slug: string
    }
}

export default async function ProductPage({ params}: Props) {
    const { slug } = params
    const product = await getProductBySlug(slug)

    if(!product){
        redirect(`/admin/products`)
    }

  return (
    <div>
      <Title title={product?.title ?? "Producto no encontrado"}  />

      <ProductForm product={product} />
    </div>
  );
}