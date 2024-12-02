import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrearPartida from "../components/moleculas/CrearPartida/CrearPartida";
import CrearUserAdmin from "../components/moleculas/CrearUserAdmin/CrearUserAdmin";
import VisualizarMesa from "../components/moleculas/VisualizarMesa/VisualizarMesa";
import Invitar from "../components/pages/Invitar/Invitar";
const Rutas = () => {
    return(
        <Router>
            <Routes>
            <Route path="/visualizarInvitado" element={<VisualizarMesa tipo="invitado" />} />
            <Route path="/visualizarMesa" element={<VisualizarMesa tipo="propietario" />} />
            <Route path="/" element={<CrearPartida />} />
            <Route path="/crearAdmin" element={<CrearUserAdmin />} />
            <Route path="/invitar" element={<Invitar />} />
            </Routes>
        </Router>
    )
}

export default Rutas;



