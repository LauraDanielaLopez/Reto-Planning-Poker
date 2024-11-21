import React from 'react';
import LayoutCenter from './components/layouts/LayoutCenter/LayoutCenter.jsx';
import CrearPartida from './components/moleculas/CrearPartida/CrearPartida.jsx';
import './App.css';
import CrearUserAdmin from './components/moleculas/CrearUserAdmin/CrearUserAdmin.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrearPartida />}/>
        <Route path="/crearAdmin" element={<CrearUserAdmin />}/>
      </Routes>
    </Router>
  );
};

export default App;
