import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

function CategoryBeritaFull() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [listBerita, setListBerita] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/category`);
        if (response.status === 200 && response.data) {
          setCategories(response.data.data || []);
        } else {
          console.error("Kategori tidak ditemukan atau format salah");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBeritaByCategory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/berita/category/id/${id}`);
        if (response.status === 200 && response.data.status === "ok") {
          setListBerita(response.data.data || []);
        } else {
          console.error("Data berita tidak ditemukan atau format salah");
        }
      } catch (error) {
        console.error("Error fetching berita:", error);
      }
    };

    if (id) {
      fetchBeritaByCategory();
    }
  }, [id]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const results = listBerita.filter((berita) =>
        berita.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setNotFound(results.length === 0);
    } else {
      setSearchResults([]);
      setNotFound(false);
    }
  }, [searchQuery, listBerita]);

  if (!categories.length) {
    return <div>Loading categories...</div>;
  }

  const category = categories.find((cat) => cat.id === parseInt(id));

  if (!category) {
    return <div>Berita Tidak Ditemukan !</div>;
  }

  const displayedBerita = searchQuery.trim() !== "" ? searchResults : listBerita;

  return (
    <div className="grid grid-cols-12 px-4 p-12 mt-20">
      <div className="col-start-2 col-span-2 text-lg mb-4">
        <Link to="/berita">Berita</Link> {" > "}
        <span className="blue">{category.categoryName}</span>
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
                  {item.categoryName}
                </span>
              </div>
            ) : (
              <Link
                key={item.id}
                to={`/menu-berita/${item.id}`}
                className="block font-semibold text-lg underline hover:text-blue-800"
              >
                {item.categoryName}
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
      </div>
      <div className="col-start-6 col-span-6 row-start-2">
        {notFound ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg font-semibold">Tidak ada hasil yang cocok.</p>
            <p>Silakan coba kata kunci lain.</p>
          </div>
        ) : (
          displayedBerita.map((item) => (
            <div key={item.id} className="mt-8 w-full">
              <a href={`/artikel-berita/${item.id}`} className="block">
                <div className="flex p-4 rounded-lg space-x-4 max-w-full">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      alt="Thumbnail Berita"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full">
                    <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                    <p className="text-black font-normal leading-tight">
                      {item.imageDesc}
                    </p>
                    <p className="text-sm text-right mt-auto hover:underline">
                      Lihat Selengkapnya ➔
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryBeritaFull;
