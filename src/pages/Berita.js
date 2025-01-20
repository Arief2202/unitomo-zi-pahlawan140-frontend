import Navbar from '../components/Navbar.js';
import BeritaPopuler from '../components/BeritaPopuler.js';
import CategoryBerita from '../components/CategoryBerita.js';

function Berita() {
    return (
      <div>
        <Navbar />
        <BeritaPopuler />
        <CategoryBerita />
      </div>
    ); 
  } 
  
  export default Berita;