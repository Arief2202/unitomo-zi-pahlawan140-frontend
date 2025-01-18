import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import berita1 from "./assets/FotoBerita/3.png";
import berita2 from "./assets/FotoBerita/4.png";
import berita3 from "./assets/FotoBerita/6.png";
import berita4 from "./assets/FotoBerita/8.png";

const berita = [
  {
    id: 1,
    link: "https://example.com/berita1",
    image: berita1,
    title: "Launching 100% Desa Cantik",
  },
  {
    id: 2,
    link: "https://example.com/berita2",
    image: berita2,
    title: "PELANGI Pembelajaran dan Sharing Pagi",
  },
  {
    id: 3,
    link: "https://example.com/berita3",
    image: berita3,
    title: "Kunjungan ke Universitas Muhammadiyah Sidoarjo",
  },
  {
    id: 4,
    link: "https://example.com/berita4",
    image: berita4,
    title: "Jumat Asyik Bergerak (JUARA)",
  },
  {
    id: 5,
    link: "https://example.com/berita3",
    image: berita3,
    title: "Kunjungan ke Universitas Muhammadiyah Sidoarjo",
  },
  {
    id: 6,
    link: "https://example.com/berita1",
    image: berita1,
    title: "Launching 100% Desa Cantik",
  },
];

const BeritaPopuler = () => {
  return (
    <section className="py-10 px-5 mt-20">
        <div class="grid grid-cols-4">
            <div className="col-start-2 col-span-2 mt-10" >
                <p className="text-5xl font-bold mb-7">
                    Berita{" "}
                    <span className="blue">Populer</span>
                </p>
            </div>
        </div>

        <div className="max-w-5xl mx-auto px-5 lg:px-20">
        <Swiper
           slidesPerView={5}
           spaceBetween={20}
          className="mySwiper"
        >
          {berita.map((item) => (
            <SwiperSlide key={item.id} >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-44 h-32 mx-auto rounded-md object-cover"
                />
                <h3 className="text-xs font-bold underline text-gray-800 mt-1/2 w-40 text-left">
                  {item.title}
                </h3>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BeritaPopuler;

