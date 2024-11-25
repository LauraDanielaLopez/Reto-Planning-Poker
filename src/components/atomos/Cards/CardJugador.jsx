import React from "react";
import "./CardJugador.css";

const CardJugador = ({ tipo, cartaSeleccionada }) => {
  const renderCard = () => {
    if (!cartaSeleccionada) {
      return <div className="card card__border"></div>; // Carta en blanco
    }
    return <div className="card">{cartaSeleccionada}</div>; // Carta seleccionada
  };

  return (
    <div className={`card__container ${tipo}`}>
      {renderCard()}
    </div>
  );
};

export default CardJugador;
