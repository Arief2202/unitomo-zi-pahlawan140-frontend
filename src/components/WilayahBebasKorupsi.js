import React from "react";
import gambar1 from "./assets/FotoBerita/5.png";
import gambar2 from "./assets/FotoBerita/9.png";
import gambar3 from "./assets/FotoBerita/8.png";

const WilayahBebasKorupsi = () => {
  return (
    <div>
      <p className="title mt-10 mx-auto text-center">
      WILAYAH BEBAS {" "}
      <span className="blue title">KORUPSI</span>{" "}
      (WBK)
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-center mt-5 relative">
        <div>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            BPS Kabupaten Sidoarjo menerima Penghargaan Satker Predikat Wilayah
            Bebas dari Korupsi (WBK) dari Kementrian PAN-RB pada Senin, 20
            Desember 2021. Setelah melalui beberapa kali Desk Evaluation (DE)
            WBK, tahun 2021 BPS Kabupaten Sidoarjo resmi menjadi satker dengan
            predikat WBK.
          </p>
          <p className="text-gray-800 text-lg leading-relaxed">
            WBK merupakan predikat yang diberikan kepada satuan kerja yang
            telah memenuhi kriteria tertentu sebagai bentuk pencegahan
            terjadinya korupsi, kolusi, dan nepotisme.
          </p>
          <div className="emblem">
          <img
            src="https://pa-ujungtanjung.go.id/images/images/gallery/wbk_copy.png"
            alt="Emblem WBK"
            className="h-32 w-auto"
          />
        </div>
          <div className="border border-sky-200 p-3 mt-20">
          <ul className="grid grid-cols-2 gap-4 text-lg text-gray-700 mt-10">
            <li className="flex items-center">
              <span className="text-yellow-500 text-3xl mr-2">✔</span> Manajemen
              Perubahan
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500 text-3xl mr-2">✔</span> Penataan
              Sistem Manajemen SDM
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500 text-3xl mr-2">✔</span> Penataan
              Tata Laksana
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500 text-3xl mr-2">✔</span> Penguatan
              Akuntabilitas Kinerja
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500 text-3xl mr-2">✔</span> Penguatan
              Pengawasan
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500 text-3xl mr-2">✔</span> Penguatan
              Kualitas Layanan
            </li>
          </ul>
        </div>
        </div>
        <div class="relative">
          <div class="decor-circle2"></div>
          <div class="decor-circle3"></div>
          <div class="photo-grid justify-center">
            <div className="photo-large">
              <img
                src={gambar1}
                alt="Gambar Bes"
              />
            </div>
            <div className="photo-small mb-2">
              <img
                src={gambar2}
                alt="Gambar Kecil 1"
              />
            </div>
            <div className="photo-small mt-2">
              <img
                src={gambar3}
                alt="Gambar Kecil 2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WilayahBebasKorupsi;
