import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BeritaPopuler = () => {
  const [popularBerita, setPopularBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularBerita = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/berita/popular`);
        if (response.status === 200 && response.data.status === "ok") {
          setPopularBerita(response.data.data || []);
        } else {
          console.error(
            "Data berita populer tidak ditemukan atau format salah"
          );
        }
      } catch (error) {
        console.error("Error fetching popular news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBerita();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-10 px-5 mt-20">
      <div className="grid grid-cols-4">
        <div className="col-start-2 col-span-2 mt-10">
          <p className="text-5xl font-bold mb-7">
            Berita <span className="blue">Populer</span>
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-20">
        <Swiper slidesPerView={5} spaceBetween={20} className="mySwiper">
          {popularBerita.map((item) => (
            <SwiperSlide key={item.id}>
              <a
                href={item.link}
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
