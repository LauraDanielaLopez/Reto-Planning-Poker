import React from 'react';
import CrearPartida from './components/moleculas/CrearPartida/CrearPartida.jsx';
import './App.css';
import CrearUserAdmin from './components/moleculas/CrearUserAdmin/CrearUserAdmin.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VisualizarMesa from './components/moleculas/VisualizarMesa/VisualizarMesa.jsx';

const App = () => {
  // Detectar si estamos en producción o desarrollo
  const basename = process.env.NODE_ENV === "production" ? "/Reto-Planning-Poker" : "";

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<CrearPartida />} />
        <Route path="/crearAdmin" element={<CrearUserAdmin />} />
        <Route path="/visualizarMesa" element={<VisualizarMesa />} />
      </Routes>
    </Router>
  );
};

export default App;
