import React from "react";
import { useParams, Link } from "react-router-dom";
import gambar1 from "./assets/Berita-ZI/ZI-1.jpg";

const listBerita = [
  {
    id: 1,
    judul: "Judul Berita Yang Berasal Dari Inputan Judul Artikel",
    desc: "desc 1, sumber : kencono",
    image: gambar1,
    link: "/menu-berita",
    time: "Senin, 13 Januari 2025 14.30 WIB",
  },
  {
    id: 2,
    judul: "Category News 2",
    desc: "desc 2, sumber : kencono",
    image: gambar1,
    link: "#",
    time: "Senin, 13 Januari 2025 14.30 WIB",
  },
  {
    id: 3,
    judul: "Category News 3",
    desc: "desc 3, sumber : kencono",
    image: gambar1,
    link: "#",
    time: "Senin, 13 Januari 2025 14.30 WIB",
  },
  {
    id: 4,
    judul: "Category News 4",
    desc: "desc 4, sumber : kencono",
    image: gambar1,
    link: "#",
    time: "Senin, 13 Januari 2025 14.30 WIB",
  },
];

const category = [
  { id: 1, name: "Category News 1"},
  { id: 2, name: "Category News 2"},
  { id: 3, name: "Category News 3"},
  { id: 4, name: "Category News 4"},
  { id: 5, name: "Category News 69"},
];

const ArtikelBeritaBody = () => {
  const { id } = useParams();


  return (
    <div className="grid grid-cols-12 px-4 p-12 mt-20">
      {listBerita.map((item) =>
        parseInt(id) === item.id ? (
          <div key={item.id} className="col-start-3 col-span-5 row-start-1 mt-20">
            <div className="text-3xl font-bold inter mb-4">{item.judul}</div>
            <div className="flex justify-between items-center mt-12">
              <div className="text-gray-600 text-xs">{item.time}</div>
              <div className="text-gray-800 text-xs">{item.desc}</div>
            </div>
            <img src={item.image}
            className="rounded-xl mt-3"
            ></img>
          </div>
        ) : null
      )}
      <div className="col-start-9 col-span-2">
        <div className="relative">
          <div className="absolute bg-yellow-500 h-7 w-14 top-1 -left-4 -z-10"></div>
          <p className="text-2xl font-bold">
            Menu{" "}
            <span className="blue">Berita ZI-RB</span>
          </p>
          <div className="border-t-2 border-black mt-2 w-full"></div>
        </div>
        <div className="mt-4 space-y-4">
          {category.map((item) => (
            <Link
            key={item.id}
            to={`/menu-berita/${item.id}`}
            className="block font-semibold text-lg underline hover:text-blue-800"
          >
            {item.name}
          </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtikelBeritaBody;
