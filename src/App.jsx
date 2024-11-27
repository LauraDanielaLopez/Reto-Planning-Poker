import React from 'react';
import CrearPartida from './components/pages/CrearPartida/CrearPartida.jsx';
import './App.css';
import CrearUserAdmin from './components/pages/CrearUserAdmin/CrearUserAdmin.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VisualizarMesa from './components/pages/VisualizarMesa/VisualizarMesa.jsx';
import Invitar from './components/pages/Invitar/Invitar.jsx';

const App = () => {
  // Detectar si estamos en producción o desarrollo
  const basename = process.env.NODE_ENV === "production" ? "/Reto-Planning-Poker" : "";

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<CrearPartida />} />
        <Route path="/crearAdmin" element={<CrearUserAdmin />} />
        <Route path="/visualizarMesa" element={<VisualizarMesa />} />
        <Route path="/invitar" element={<Invitar />} />
      </Routes>
    </Router>
  );
};

export default App;
