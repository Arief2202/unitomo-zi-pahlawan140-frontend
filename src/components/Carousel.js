import React, { useState, useEffect } from "react";
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/carousel/all`);
        if (response.status === 200 && response.data.status === "ok") {
          const activeImages = response.data.data.filter(item => item.active);
          setImages(activeImages);
        }
      } catch (err) {
        setError("Gagal memuat gambar carousel.");
      } finally {
        setLoading(false);
      }
    };
    fetchCarouselImages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!images.length) return <div>Tidak ada gambar tersedia.</div>;

  return (
    <div>
      <Swiper
        className="carousel"
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop={true}
        effect={"fade"}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              className="img_carousel"
              src={item.image}
              alt={`Carousel ${item.id}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="backdrop-blur-xl custom-prev">❮</div>
      <div className="backdrop-blur-xl custom-next">❯</div>
    </div>
  );
};
