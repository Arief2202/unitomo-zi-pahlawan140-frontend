import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import gambar1 from "./assets/FotoBerita/3.png";

const categories = [
  {
    id: 1,
    name: "Category News 1",
    description: "This is the content for Category News 1.",
    subcategories: [
      { id: 101, name: "Sub category 1.1" },
      { id: 102, name: "Sub category 1.2" },
      { id: 103, name: "Sub category 1.3" },
    ],
  },
  {
    id: 2,
    name: "Category News 2",
    description: "This is the content for Category News 2.",
    subcategories: [
      { id: 201, name: "Sub category 2.1" },
      { id: 202, name: "Sub category 2.2" },
    ],
  },
];

const listBerita = [
  {
    id: 1,
    judul: "Category News 1",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum exercitationem unde cupiditate ipsa explicabo quidem, quas, quos, dolorum quae quia quibusdam.",
    image: gambar1,
    link: "/menu-berita",
  },
  {
    id: 2,
    judul: "Category News 2",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum exercitationem unde cupiditate ipsa explicabo quidem, quas, quos, dolorum quae quia quibusdam.",
    image: gambar1,
    link: "#",
  },
  {
    id: 3,
    judul: "Category News 3",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum exercitationem unde cupiditate ipsa explicabo quidem, quas, quos, dolorum quae quia quibusdam.",
    image: gambar1,
    link: "#",
  },
  {
    id: 4,
    judul: "Category News 4",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum exercitationem unde cupiditate ipsa explicabo quidem, quas, quos, dolorum quae quia quibusdam.",
    image: gambar1,
    link: "#",
  },
];

function CategoryBeritaFull() {
  const { id } = useParams();
  const category = categories.find((cat) => cat.id === parseInt(id));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const results = listBerita.filter((berita) =>
        berita.judul.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  if (!category) {
    return <div>Berita Tidak Ditemukan !</div>;
  }

  return (
      <div className="grid grid-cols-12 px-4 p-12 mt-20">
        <div className="col-start-2 col-span-2 text-lg mb-4">
          <Link to="/berita">Berita</Link> {" > "}
          <span className="blue">{category.name}</span>
        </div>
        <div className="col-start-3 col-span-2">
          <div className="relative mt-10">
            <div className="absolute hr-orange h-7 w-14 top-2 -left-4 -z-10"></div>
            <p className="text-2xl font-bold">
              Menu {" "}
              <span className="blue">Berita ZI-RB</span>
            </p>
            <div className="border-2 border-black mt-2 w-full"></div>
          </div>
          <div className="mt-4 space-y-4">
            {categories.map((item) =>
              parseInt(id) === item.id ? (
                <div key={item.id}>
                  <span className="block font-semibold text-lg blue">
                    {item.name}
                  </span>
                  <div className="ml-4 mt-2 space-y-2">
                    {item.subcategories.map((subcategory) => (
                      <span
                        key={subcategory.id}
                        className="block text-gray-700"
                      >
                        {subcategory.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.id}
                  to={`/menu-berita/${item.id}`}
                  className="block font-semibold text-lg underline hover:text-blue-800"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
        <div className="col-start-9 col-span-3 mt-4 row-start-1">
          <div className="relative w-full">
            <i className="fa fa-search absolute left-3 top-2.5 text-gray-500"></i>
            <input
              type="text"
              className="border-2 border-black rounded-full px-8 py-1 w-full"
              placeholder="Cari judul berita disini"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.length > 0 ? (
            <div className="mt-4">
              <p className="font-semibold">Hasil Pencarian:</p>
              <ul className="list-disc list-inside">
                {searchResults.map((result) => (
                  <li key={result.id} className="text-gray-700">
                    <Link to={result.link} className="underline hover:text-blue-800">
                      {result.judul}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            searchQuery && (
              <p className="mt-4 text-gray-500">Tidak ada hasil yang cocok.</p>
            )
          )}
        </div>
        <div className="col-start-6 col-span-6 row-start-2">
        {listBerita.map((item) => (
        <div className="mt-8">
        <a
          href={item.link}
          className="flex items-center"
        >
           <div className="flex p-4rounded-lg space-x-4 max-w-4xl">
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={item.image}
          alt="Thumbnail Berita"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">{item.judul}</h2>
        <p className="text-black font-normal mb-4 leading-tight">
        {item.desc}
        </p>
        <p className="text-right mr-12 hover:underline">
          Lihat Selengkapnya ➔
        </p>
      </div>
    </div>
    </a>
        </div>
        ))}
        </div>
      </div>
  );
}

export default CategoryBeritaFull;
