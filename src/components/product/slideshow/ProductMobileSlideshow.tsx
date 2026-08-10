"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "./slideshow.css";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-pagination-color": "#2563eb",
          } as React.CSSProperties
        }
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
        }}
        modules={[Pagination, Autoplay]}
        observer={true}
        observeParents={true}
        className="mySwiperMobile"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={600}
              height={500}
              src={`/products/${image}`}
              alt={title}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
