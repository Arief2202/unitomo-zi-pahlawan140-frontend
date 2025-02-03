import { useEffect } from "react";
import { scroller } from "react-scroll";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar.js";
import Carousel from "../components/Carousel.js";
import Integritas from "../components/Integritas.js";
import BeritaTerkini from "../components/BeritaTerkini.js";
import WilayahBebasKorupsi from "../components/WilayahBebasKorupsi.js";
import RoadMap from "../components/RoadMap.js";
import Reformasi from "../components/Reformasi.js";
import { useRef } from "react";

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

  // Animasi Fade-In dari Bawah
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <div className="pt-20">
      <Navbar />

      {/* Carousel */}
      <SectionAnimation>
        <div id="beranda">
          <Carousel />
        </div>
      </SectionAnimation>

      {/* Integritas (Bagian kiri lebih dulu) */}
      <SectionAnimation isLeft>
        <div id="profil">
          <Integritas />
        </div>
      </SectionAnimation>

      {/* Berita Terkini (Bagian kanan lebih lambat) */}
      <SectionAnimation isRight>
        <BeritaTerkini />
      </SectionAnimation>

      {/* Wilayah Bebas Korupsi */}
      <SectionAnimation isLeft>
        <div id="wbk">
          <WilayahBebasKorupsi />
        </div>
      </SectionAnimation>

      {/* Roadmap */}
      <SectionAnimation isRight>
        <div id="roadmap">
          <RoadMap />
        </div>
      </SectionAnimation>

      {/* Reformasi */}
      <SectionAnimation isLeft>
        <div id="timeline">
          <Reformasi />
        </div>
      </SectionAnimation>
    </div>
  );
}

// Komponen untuk Animasi Scroll
const SectionAnimation = ({ children, isLeft, isRight }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.8, delay: isLeft ? 0 : isRight ? 0.3 : 0 } 
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default Beranda;
