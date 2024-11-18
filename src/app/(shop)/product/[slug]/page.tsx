export const revalidate = 604800

import { getProductBySlug } from "@/actions";
import {
  ProductMovileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
} from "@/components/inedx";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}
export default async function PriductPage({ params }: Props) {
  //TODO AQUI TAMBIEN CREO QUE DEBERIA hacer un getstatic params?? vara revalidar y hacer catch????
  const { slug } = params;
  //const product = initialData.products.find((product) => product.slug === slug);

  const product = await getProductBySlug(slug)

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* Mobile SLIDESHOW */}
      <div className="col-span-1 md:col-span-2">
        <ProductMovileSlideShow title={product.title} images={product.images} className="block md:hidden" />
      {/*Desktop SLIDESHOW */}
        <ProductSlideShow title={product.title} images={product.images} className="hidden md:block"/>
      </div>

 

      {/* Detalles */}
      <div className="col-span-1 px-5 ">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {" "}
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}</p>

        {/* selector de tallas */}
        <SizeSelector selectedSize="M" availableSizes={product.sizes} />

        {/* selector de cantidad */}
        <QuantitySelector quantity={1} />

        {/* BUTTOON */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* description */}
        <h3 className="text-sm font-bold">Descrición</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
