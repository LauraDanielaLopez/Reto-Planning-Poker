import React from "react";
import "./CardJugador.css";

const CardJugador = ({ tipo, cartaSeleccionada, nombre }) => {

  const renderCard = () => {
    if (!cartaSeleccionada) {
      return <div className="card card__border"></div>; // Carta en blanco
    }
    return (
      <div className={`card ${cartaSeleccionada ? "carta-seleccionada" : ""}`}>
        {/* {cartaSeleccionada} se quita para que no se muestre eel valor en la card*/} 
      </div>
    ); // Carta seleccionada
  };

  return (
    <div className={`card__container ${tipo}`}>
      {renderCard()}
      <h3 className="card__label">{nombre}</h3> {/* Nombre debajo de la carta */}
    </div>
  );
};

export default CardJugador;
