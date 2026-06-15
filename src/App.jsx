import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/login'; // 👈 1. Import halaman Login kamu
import Kasir from './pages/Dashboard/Kasir';
import Admin from './pages/Dashboard/Admin';
import Owner from './pages/Dashboard/Owner';
import Pelanggan from './pages/Dashboard/Pelanggan';

function App() {
  return (
    <Router>
      <Routes>
        {/* 👈 2. Saat aplikasi pertama dibuka (Akses localhost:5173), langsung muncul halaman Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        {/* Halaman Dashboard POS dan Manajemen */}
        <Route path="/kasir" element={<Kasir />} />
        <Route path="/admin" element={<Admin />} /> 
        <Route path="/owner" element={<Owner />} /> 
        <Route path="/pelanggan" element={<Pelanggan />} /> 
      </Routes>
    </Router>
  );
}

export default App;