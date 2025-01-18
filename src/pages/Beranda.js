import Navbar from '../components/Navbar.js';
import Carousel from '../components/Carousel.js'; 
import Integritas from '../components/Integritas.js';
import BeritaTerkini from '../components/BeritaTerkini.js';
import WilayahBebasKorupsi from '../components/WilayahBebasKorupsi.js';
import RoadMap from '../components/RoadMap.js';
import Reformasi from '../components/Reformasi.js';



function Beranda() {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Integritas />
      <BeritaTerkini />
      <WilayahBebasKorupsi />
      <RoadMap />
      <Reformasi />
    </div>
  );
}

export default Beranda;