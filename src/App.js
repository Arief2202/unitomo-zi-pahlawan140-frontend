import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Beranda from "./pages/Beranda";
import Berita from "./pages/Berita";
import MenuBerita from "./pages/MenuBerita";
import ArtikelBerita from "./pages/ArtikelBerita";
import Dashboard from "./pages/admin/dashboard";
import BeritaAdmin from "./pages/admin/berita";
import Category from "./pages/admin/category";
import Carousel from "./pages/admin/carousel";
import Login from "./pages/admin/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/menu-berita/:id" element={<MenuBerita />} />
        <Route path="/artikel-berita/:id" element={<ArtikelBerita />} />
        <Route path="/login" element={<Login />} />

        {/* Rute yang butuh proteksi */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/beritabaru" element={<BeritaAdmin />} />
          <Route path="/categorybaru" element={<Category />} />
          <Route path="/carouselbaru" element={<Carousel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
