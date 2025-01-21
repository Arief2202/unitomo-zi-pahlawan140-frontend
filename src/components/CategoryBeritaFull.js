import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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

function CategoryBeritaFull() {
  const { id } = useParams();
  const category = categories.find((cat) => cat.id === parseInt(id));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const subcategories = category ? category.subcategories : [];

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const results = subcategories.filter((subcategory) =>
        subcategory.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, subcategories]);

  if (!category) {
    return <div>Category not found!</div>;
  }

  return (
    <div className="p-8 mt-10">
      <div className="grid grid-cols-12 px-4 p-12">
        <div className="col-start-2 col-span-2 text-lg mb-4">
          <Link to="/berita">Berita</Link> {" > "}
          <span className="blue">{category.name}</span>
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
        {/* Search bar */}
        <div className="col-start-5 col-span-6 mt-4">
          <div className="relative w-2/3">
            <i className="fa fa-search absolute left-3 top-3 text-gray-500"></i>
            <input
              type="text"
              className="border-2 border-black rounded-full px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    {result.name}
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
      </div>
    </div>
  );
}

export default CategoryBeritaFull;
