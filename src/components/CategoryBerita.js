import React, { useState, useEffect } from "react";
import axios from "axios";
import megaphone from "./assets/megaphone.svg";
import gambar1 from "./assets/FotoBerita/3.png";
import { Link } from "react-router-dom";

const category = [
  { id: 1, name: "Category News 1" },
  { id: 2, name: "Category News 2" },
  { id: 3, name: "Category News 3" },
  { id: 4, name: "Category News 4" },
  { id: 5, name: "Category News 69" },
];

function CategoryBerita() {
  const [listBerita, setListBerita] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/berita");
        if (response.status === 200 && response.data.status === "ok") {
          setListBerita(response.data.data || []);
        } else {
          console.error("Data tidak ditemukan atau format salah");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(listBerita.length / itemsPerPage);
  const currentItems = listBerita.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBeforePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculatePaginationRange = () => {
    const startPage = Math.floor((currentPage - 1) / 3) * 3 + 1;
    const endPage = Math.min(startPage + 2, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <div className="grid grid-cols-12 px-4 p-12">
      <div className="col-start-3 col-span-2">
        <div className="relative">
          <div className="absolute bg-yellow-500 h-7 w-14 top-1 -left-4 -z-10"></div>
          <p className="text-2xl font-bold">
            Menu <span className="blue">Berita ZI-RB</span>
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
        <div className="mt-10">
          <p className="text-2xl font-bold">Layanan</p>
          <div className="border-t-2 border-black mt-2 w-full"></div>
          <div className="mt-4">
            <a
              href="https://pahlawan140.com/aduan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={megaphone} alt="Layanan Aduan" className="w-16 h-16" />
            </a>
          </div>
        </div>
      </div>
      <div className="col-start-6 col-span-6">
        <div>
          <p className="text-2xl font-bold blue">TERBARU HARI INI DI ZI-RB</p>
        </div>
        <div className="mt-4">
          <img
            src={gambar1}
            alt="Berita Terbaru"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        {currentItems.map((item) => (
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
        ))}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleBeforePage}
            disabled={currentPage === 1}
          >
            Before
          </button>
          {calculatePaginationRange().map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryBerita;
