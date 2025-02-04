import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import Beranda from './pages/Beranda';
import Berita from './pages/Berita';
import MenuBerita from './pages/MenuBerita';
import ArtikelBerita from './pages/ArtikelBerita';
import Dashboard from "./pages/admin/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/menu-berita/:id" element={<MenuBerita />} />
        <Route path="/artikel-berita/:id" element={<ArtikelBerita />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
} 

export default App;