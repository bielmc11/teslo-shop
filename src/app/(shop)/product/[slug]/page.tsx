export const revalidate = 604800;

import { getProductBySlug } from "@/actions";
import {
  ProductMovileSlideShow,
  ProductSlideShow,
  StockLabel,
} from "@/components/inedx";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "Producto no encontrado",
      images: [`/products/${product?.images[0]}`],
    },
  };
}

export default async function PriductPage({ params }: Props) {
  //TODO AQUI TAMBIEN CREO QUE DEBERIA hacer un getstatic params?? vara revalidar y hacer catch????

  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Mobile SLIDESHOW */}
      <div className="col-span-1 md:col-span-2">
        <ProductMovileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        {/*Desktop SLIDESHOW */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* selector de tallas */}
        <AddToCart product={product} />
        {/* description */}
        <h3 className="text-sm font-bold">Descrición</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
