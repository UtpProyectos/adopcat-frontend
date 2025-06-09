import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

import { EffectCards, Pagination } from "swiper/modules";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <div className="w-[300px] h-[400px]">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Pagination]}
        className="h-full w-full"
        pagination={{ clickable: true }}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="rounded-xl overflow-hidden">
            <img
              src={src}
              alt={`image-${i}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
