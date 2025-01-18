import logo1 from "./assets/Logo/5.png";
import logo2 from "./assets/Logo/6.png";
import logo3 from "./assets/Logo/7.png";
import logo4 from "./assets/Logo/8.png";
import logo5 from "./assets/Logo/9.png";
import logo6 from "./assets/Logo/10.png";

const features = [
    {
      icon: logo1,
      title: "Manajemen Perubahan",
    },
    {
      icon: logo2,
      title: "Penataan Tata Laksana",
    },
    {
      icon: logo3,
      title: "Penataan SDM Aparatur",
    },
    {
      icon: logo4,
      title: "Penguatan Akuntabilitas Kinerja",
    },
    {
      icon: logo5,
      title: "Penguatan Pengawasan",
    },
    {
      icon: logo6,
      title: "Penguatan Kualitas Layanan",
    },
  ];

export default function RoadMap() {
    return (
        <div className="bg-RoadMap mt-20 p-12">
            <div className="ml-60 mr-60">
                <p className="text-center text-2xl font-bold text-white">
                Badan Pusat Statistik Kabupaten Sidoarjo menetapkan {" "}
                <span className="orange">6 area</span>{" "}
                perubahan yang setara dalam{" "}
                <span className="orange">ROAD MAP REFORMASI BIROKRASI</span>{" "}
                yang menjadi fokus pengembangan
                </p>
            </div>
            <div className="relative mt-10 flex justify-center items-center w-full">
            <hr className="custom-hr"/>
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-custom text-center space-y-3"
          >
            <div className="w-28 h-28">
              <img
              className="relative z-3"
                src={feature.icon}
                alt=""
              ></img>
            </div>
            <h3 className="orange text-custom border-custom border rounded-2xl mr-4 ml-2">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
        </div>
    )
}
