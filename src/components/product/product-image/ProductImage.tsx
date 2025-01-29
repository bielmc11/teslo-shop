import React from "react";
import Image from "next/image";

interface Props{
    src?: string,
    alt: string
    width: number
    height: number
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
}
export const ProductImage = ({src, alt, width, height, className}: Props) => {

    //ESTA FUNCION REALMENTE ES UN IF ANIDADO
    const customSrc = (src) // 1 HAy URL?
        ? src.startsWith('http') // 1.1 Esta comienza con http
            ? src  //SI comienza con htp copio tal cual la url
            : `/products/${src}` //Sino es porque la tengo en mi carpeta public
        :'/imgs/placeholder.jpg' // si no tengo src undefined




  return (
    <Image
      //src={`/products/${product.images[0]}`}
      src={customSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  );
};
