import megaphone from "./assets/megaphone.svg";
import gambar1 from "./assets/FotoBerita/3.png";
import { Link } from "react-router-dom";

const category = [
  { id: 1, name: "Category News 1"},
  { id: 2, name: "Category News 2"},
  { id: 3, name: "Category News 3"},
  { id: 4, name: "Category News 4"},
  { id: 5, name: "Category News 69"},
];
const listBerita = [
  { id: 1, judul: "Category News 1", desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum exercitationem unde cupiditate ipsa explicabo quidem, quas, quos, dolorum quae quia quibusdam.", image: gambar1, link: "/menu-berita" },
  { id: 2, judul: "Category News 2", desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum exercitationem unde cupiditate ipsa explicabo quidem, quas, quos, dolorum quae quia quibusdam.", image: gambar1, link: "#" },
  { id: 3, judul: "Category News 3", desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum exercitationem unde cupiditate ipsa explicabo quidem, quas, quos, dolorum quae quia quibusdam.", image: gambar1, link: "#" },
  { id: 4, judul: "Category News 4", desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum exercitationem unde cupiditate ipsa explicabo quidem, quas, quos, dolorum quae quia quibusdam.", image: gambar1, link: "#" },
];



function CategoryBerita() {
  return (
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
            <a href="https://pahlawan140.com/aduan" target="_blank" rel="noopener noreferrer">
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

export default CategoryBerita;
