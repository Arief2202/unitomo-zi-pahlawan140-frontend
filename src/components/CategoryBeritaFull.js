import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Komponen LazyImage dengan animasi shimmer
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  if (!loaded) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 shimmer" />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} />;
};

function CategoryBeritaFull() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("pencarian") || "";

  const [categories, setCategories] = useState([]);
  const [listBerita, setListBerita] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const beritaPerPage = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/category`);
        if (response.status === 200 && response.data) {
          setCategories(response.data.data || []);
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
        const response = await axios.get(
          `${BASE_URL}/api/berita/category/id/${id}`
        );
        if (response.status === 200 && response.data.status === "ok") {
          setListBerita(response.data.data || []);
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
    const queryParams = new URLSearchParams(location.search);
    setSearchQuery(queryParams.get("pencarian") || "");
  }, [location.search]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setCurrentPage(1);
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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/menu-berita/${id}?pencarian=${searchQuery}`);
  };

  if (!categories.length) {
    return <div>Loading categories...</div>;
  }

  const category = categories.find((cat) => cat.id === parseInt(id));
  if (!category) {
    return <div>Berita Tidak Ditemukan!</div>;
  }

  const displayedBerita =
    searchQuery.trim() !== "" ? searchResults : listBerita;
  const totalPages = Math.max(
    1,
    Math.ceil(displayedBerita.length / beritaPerPage)
  );
  const startIndex = (currentPage - 1) * beritaPerPage;
  const paginatedBerita = displayedBerita.slice(
    startIndex,
    startIndex + beritaPerPage
  );

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 2);
    return Array.from(
      { length: Math.max(0, end - start + 1) },
      (_, i) => start + i
    );
  };

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
            Menu <span className="blue">Berita ZI-RB</span>
          </p>
          <div className="border-2 border-black mt-2 w-full"></div>
        </div>

        <div className="mt-4 space-y-4">
          {categories.map((item) => {
            const categoryLink = `/menu-berita/${item.id}${
              searchQuery ? `?pencarian=${searchQuery}` : ""
            }`;
            return (
              <Link
                key={item.id}
                to={categoryLink}
                className={`block font-semibold text-lg ${
                  parseInt(id) === item.id
                    ? "blue"
                    : "underline hover:text-blue-800"
                }`}
              >
                {item.categoryName}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="col-start-9 col-span-3 mt-4 row-start-1">
        <div className="relative w-full">
          <form onSubmit={handleSearch}>
            <i className="fa fa-search absolute left-3 top-2.5 text-gray-500"></i>
            <input
              type="text"
              className="border-2 border-black rounded-full px-8 py-1 w-full"
              placeholder="Cari judul berita disini"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="col-start-6 col-span-6 row-start-2">
        {notFound ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg font-semibold">Tidak ada hasil yang cocok.</p>
            <p>Silakan coba kata kunci lain.</p>
          </div>
        ) : (
          paginatedBerita.map((item) => (
            <div key={item.id} className="mt-8 w-full">
              <Link to={`/artikel-berita/${item.id}`} className="block">
                <div className="flex p-4 rounded-lg space-x-4 max-w-full">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-md"
                  />
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
              </Link>
            </div>
          ))
        )}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-600"
            >
              Previous
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === page
                    ? "bg-blue-900 text-white font-semibold"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryBeritaFull;
