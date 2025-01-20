import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Beranda from './pages/Beranda';
import Berita from './pages/Berita';
import MenuBerita from './pages/MenuBerita';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Beranda/>}/> 
        <Route path="/berita" element={<Berita/>}/> 
        <Route path="/menu-berita/:id" element={<MenuBerita/>}/> 
      </Routes>
    </Router>
  ); 
} 

export default App;