import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Beranda from './pages/Beranda';
import Berita from './pages/Berita';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Beranda/>}/> 
        <Route path="/berita" element={<Berita/>}/> 
      </Routes>
    </Router>
  ); 
} 

export default App;