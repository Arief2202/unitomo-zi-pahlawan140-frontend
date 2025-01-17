import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Carousel(){
  return (
    <Swiper className="carousel"
      modules={[Navigation, Pagination, EffectFade, Autoplay]}
      slidesPerView={1}
      navigation
      effect={'fade'}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
      }}
    >
      <SwiperSlide><img className='img_carousel' src="https://bni.co.id/Portals/1/DNNGalleryPro/uploads/2024/12/16/JIBOR-IndoNIA.webp"/></SwiperSlide>
      <SwiperSlide><img className='img_carousel' src="https://bni.co.id/Portals/1/DNNGalleryPro/uploads/2024/12/11/Fleksi-Pensiun-Tematik-Liburan.jpg"/></SwiperSlide>
      <SwiperSlide><img className='img_carousel' src="https://bni.co.id/Portals/1/DNNGalleryPro/uploads/2024/9/17/privacy-notice-bni.webp"/></SwiperSlide>
    </Swiper>
  );
};