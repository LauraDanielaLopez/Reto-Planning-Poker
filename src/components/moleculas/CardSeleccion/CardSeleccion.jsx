import React, { useState } from "react";
import "./CardSeleccion.css";
import { envia } from "../../../services/ajax";

const CardSeleccion = ({ jugador, actualizarJugador }) => {
  const [cartaSeleccionada, setCartaSeleccionada] = useState(jugador.cartaSeleccionada);

  const handleSeleccion = async (carta) => {
    setCartaSeleccionada(carta); // Actualiza localmente
    try {
      await envia(`usuarios/${jugador.id}`, { ...jugador, cartaSeleccionada: carta }); // Envía al backend
      actualizarJugador(jugador.id, carta); // Actualiza en el estado de VisualizarMesa
    } catch (error) {
      console.error("Error al seleccionar carta:", error);
      alert("No se pudo actualizar la carta seleccionada.");
    }
  };

  return (
    <div className="card-seleccion">
      <h3>{jugador.nombre}</h3>
      <div className="card-options">
        {["Carta 1", "Carta 2", "Carta 3"].map((carta, index) => (
          <button
            key={index}
            className={`card-button ${carta === cartaSeleccionada ? "selected" : ""}`}
            onClick={() => handleSeleccion(carta)}
          >
            {carta}
          </button>
        ))}
      </div>
      {cartaSeleccionada && <p>Carta seleccionada: {cartaSeleccionada}</p>}
    </div>
  );
};

export default CardSeleccion;
