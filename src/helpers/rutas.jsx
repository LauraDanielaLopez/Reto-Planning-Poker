import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrearPartida from "../components/moleculas/CrearPartida/CrearPartida";
import CrearUserAdmin from "../components/moleculas/CrearUserAdmin/CrearUserAdmin";
import VisualizarMesa from "../components/moleculas/VisualizarMesa/VisualizarMesa";
import Invitar from "../components/pages/Invitar/Invitar";
import VisualizarInvitado from "../components/pages/VisualizarInvitado/VisualizarInvitado";

const Rutas = () => {
    return(
        <Router>
            <Routes>
            <Route path="/visualizarMesa" element={<VisualizarMesa />} />
            <Route path="/visualizarInvi" element={<VisualizarInvitado />} />
            <Route path="/" element={<CrearPartida />} />
            <Route path="/crearAdmin" element={<CrearUserAdmin />} />
            <Route path="/invitar" element={<Invitar />} />
            </Routes>
        </Router>
    )
}

export default Rutas;



