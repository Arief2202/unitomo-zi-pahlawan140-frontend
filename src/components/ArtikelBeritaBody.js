import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "EEEE, dd MMMM yyyy HH.mm 'WIB'", { locale: id });
};

const ArtikelBeritaBody = () => {
  const { id } = useParams(); 
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/category");
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
        const response = await axios.get(`http://localhost:8000/api/berita/${id}`);
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
  );
};

export default ArtikelBeritaBody;
