import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import Beranda from './pages/Beranda';
import Berita from './pages/Berita';
import MenuBerita from './pages/MenuBerita';
import ArtikelBerita from './pages/ArtikelBerita';
import Dashboard from "./pages/admin/dashboard";
import BeritaAdmin from "./pages/admin/berita";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/menu-berita/:id" element={<MenuBerita />} />
        <Route path="/artikel-berita/:id" element={<ArtikelBerita />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/beritabaru" element={<BeritaAdmin />} />
      </Routes>
    </Router>
  );
} 

export default App;