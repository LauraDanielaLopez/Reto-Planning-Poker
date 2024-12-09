import React from "react";
import "./CardJugador.css";

const CardJugador = ({ tipo, cartaSeleccionada, nombre, isSelec, revelado, visualizacion }) => {
  const iniciales = (nombre) => {
    if (typeof nombre === "string") {
      const palabras = nombre.trim().split(" ");
      return palabras.length === 1
        ? palabras[0].slice(0, 2).toUpperCase()
        : palabras.map((word) => word[0]?.toUpperCase()).join("").slice(0, 2);
    }
    return "";
  };
  
  const renderCard = () => {
    let cardClass = "card";

    if (visualizacion === "espectador") {
      // Si es espectador
      return <div className={`${cardClass} espectador`}>
        <span className="iniciales">{iniciales(nombre)}</span>
      </div>;
    }

    if (isSelec && !revelado) {
      cardClass += " carta__seleccionada"; // Seleccionada pero no revelada
    }

    if (revelado) {
      cardClass += " card__border"; // Revelada
    }

    return (
      <div className={cardClass}>
        {revelado ? cartaSeleccionada : null}
      </div>
    );
  };

  return (
    <div className={` card__container ${tipo}`}>
      {renderCard()}
      <h3 className="card__label">{nombre}</h3>
    </div>
  );
};

export default CardJugador;
