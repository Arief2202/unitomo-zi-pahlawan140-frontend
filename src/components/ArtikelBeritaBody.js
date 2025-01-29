import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "EEEE, dd MMMM yyyy HH.mm 'WIB'", { locale: id });
};

const ArtikelBeritaBody = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

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
    const fetchBerita = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/berita/${id}`);
        if (response.data.status === "ok") {
          setBerita(response.data.data);
        } else {
          throw new Error("Data tidak ditemukan.");
        }
        setLoading(false); 
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data."); 
        setLoading(false);
      }
    };

    fetchBerita();
  }, [id]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/menu-berita/1?pencarian=${search}`);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-12 px-4 p-12 mt-20">
      {berita && (
        <div className="col-start-3 col-span-5 row-start-1 mt-20">
          <div className="text-3xl font-bold inter mb-4">{berita.title}</div>
          <div className="flex justify-between items-center mt-12">
            <div className="text-gray-600 text-xs">{formatDate(berita.createdAt)}</div>
            <div className="text-gray-800 text-xs">{berita.author}</div>
          </div>
          <img
            src={berita.image}
            alt={berita.title}
            className="rounded-xl mt-3"
          />
        </div>
      )}
        <div className="col-start-9 col-span-3 flex flex-col w-full">
          <div className="w-full">
            <div className="relative">
              <i className="fa fa-search absolute left-3 top-2.5 text-gray-500"></i>
              <form onSubmit={handleSearch} className="mt-4">
                <input
                  type="text"
                  className="border-2 border-black rounded-full px-8 py-1 w-full"
                  placeholder="Cari judul berita disini"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="mt-24 w-full">
            <div className="relative">
              <div className="absolute bg-yellow-500 h-7 w-14 top-1 -left-4 -z-10"></div>
              <p className="text-2xl font-bold">
                Menu <span className="blue">Berita ZI-RB</span>
              </p>
              <div className="border-t-2 border-black mt-2 w-full"></div>
            </div>
            <div className="mt-4 space-y-4">
              {categories.map((item) => (
                <Link
                  key={item.id}
                  to={`/menu-berita/${item.id}`}
                  className="block font-semibold text-lg underline hover:text-blue-800"
                >
                  {item.categoryName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ArtikelBeritaBody;
