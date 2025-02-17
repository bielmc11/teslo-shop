"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}
export const ProductMovileSlideShow = ({ className, images, title }: Props) => {
  return (
    <div className={` ${className} flex flex-col items-center`}>
      <Swiper
        className="max-w-[1000px]"
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        autoplay={{
          delay: 5500,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
      >
        {images.length === 0 && (
          <SwiperSlide className="h-[500px] md:h-800px ">
            <ProductImage
              width={800}
              height={600}
              alt={title}
              className="rouned-lg object-cover md:object-cover lg:object-contain  "
            />
          </SwiperSlide>
        )}
        {images.map((image) => (
          <SwiperSlide key={image} className="h-[500px]  ">
            <Image
              width={600}
              height={500}
              src={`/products/${image}`}
              alt={title}
              className="object-cover  "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
