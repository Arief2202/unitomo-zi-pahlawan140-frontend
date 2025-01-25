import React from "react";
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Carousel(){
  return (
    <div>
    <Swiper className="carousel mt-20"
      modules={[Navigation, Pagination, EffectFade, Autoplay]}
      slidesPerView={1}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      loop={true}
      effect={'fade'}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
      }}
    >
      <SwiperSlide><img className='img_carousel' src="https://nos.jkt-1.neo.id/cdc-s3/image/2024/10/08/aespa-tour_19_6704af378cf93.jpg"/></SwiperSlide>
      <SwiperSlide><img className='img_carousel' src="https://cdn.k-ennews.com/news/photo/202412/5614_15336_3456.jpg"/></SwiperSlide>
      <SwiperSlide><img className='img_carousel' src="https://upload.wikimedia.org/wikipedia/commons/2/2f/%EB%A0%88%EB%93%9C%EB%B2%A8%EB%B2%B3%28Red_Velvet%29_%EC%BC%80%EC%9D%B4%EC%BD%98_%EC%9E%AC%ED%8C%AC_2024_%EB%A0%88%EB%93%9C%EC%B9%B4%ED%8E%AB_KCON_JAPAN_2024_%281%29.jpg"/></SwiperSlide>
    </Swiper>
          <div className="backdrop-blur-xl custom-prev">❮</div>
          <div className="backdrop-blur-xl custom-next">❯</div>
          </div>
  );
};