"use client";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideshow.css";

import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}
export const ProductSlideShow = ({ className, images, title }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={` ${className} flex flex-col items-center`}>
      <Swiper
      className="max-w-[1000px]"
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        autoplay={{
          delay: 5500,
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
      >
        {images.map((image) => (
          <SwiperSlide key={image} className="h-[500px] md:h-800px ">
            <Image
              width={800}
              height={600}
              src={`/products/${image}`}
              alt={title}
              className="rouned-lg object-cover md:object-cover lg:object-contain  "
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper swiper-2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={300}
              height={300}
              src={`/products/${image}`}
              alt={title}
              className="rounded lg-object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
