import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrearPartida from "../components/moleculas/CrearPartida/CrearPartida";
import CrearUserAdmin from "../components/moleculas/CrearUserAdmin/CrearUserAdmin";

const Rutas = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<CrearPartida />} />
                <Route path="/crearAdmin" element={<CrearUserAdmin />} />
            </Routes>
        </Router>
    )
}

export default Rutas;



