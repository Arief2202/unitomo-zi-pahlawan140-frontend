import { useEffect } from "react";
import { scroller } from "react-scroll";
import Navbar from "../components/Navbar.js";
import Carousel from "../components/Carousel.js";
import Integritas from "../components/Integritas.js";
import BeritaTerkini from "../components/BeritaTerkini.js";
import WilayahBebasKorupsi from "../components/WilayahBebasKorupsi.js";
import RoadMap from "../components/RoadMap.js";
import Reformasi from "../components/Reformasi.js";

function Beranda() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        scroller.scrollTo(hash, {
          smooth: true,
          duration: 500,
          offset: -80,
        });
      }, 1000);
    }
  }, []);

  return (
    <div className="pt-20">
      <Navbar />

      <div id="beranda">
        <Carousel />
      </div>

      <div id="profil">
        <Integritas />
      </div>

        <BeritaTerkini />

      <div id="wbk">
        <WilayahBebasKorupsi />
      </div>

      <div id="roadmap">
        <RoadMap />
      </div>

      <div id="timeline">
        <Reformasi />
      </div>
    </div>
  );
}

export default Beranda;
