import React from "react";
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

  if (!category) {
    return <div>Category not found!</div>;
  }

  return (
    <div className="p-8 mt-20">
      <div className="text-lg mb-4">
        <Link to="/berita">Berita</Link> {" > "}
        <span>{category.name}</span>
      </div>

      <div className="grid grid-cols-12 px-4 p-12">
      <div className="col-start-3 col-span-2">
        <div className="relative">
          <div className="absolute bg-yellow-500 h-7 w-14 top-1 -left-4 -z-10"></div>
          <p className="text-2xl font-bold">
            Menu{" "}
            <span className="blue">Berita ZI-RB</span>
          </p>
          <div className="border-t-2 border-black mt-2 w-full"></div>
        </div>
        <div className="mt-4 space-y-4">
        {categories.map((item) =>
          parseInt(id) === item.id ? (
            <span
              key={item.id}
              className="block font-semibold text-lg text-gray-500"
            >
              {item.name}
            </span>
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
      </div>
      </div>
  );
}

export default CategoryBeritaFull;
