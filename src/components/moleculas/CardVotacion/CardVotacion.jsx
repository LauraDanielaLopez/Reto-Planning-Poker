import React from "react";
import './CardVotacion.css';

const CardVotacion = ({ onCartaSeleccionada }) => {
  const valoresCartas = ["0", "1", "3", "5", "8", "13", "21", "34", "55", "89", "?", "☕"];

  return (
    <section className="cardV">
      <p className="cardV__text">Elige una carta 👇</p>
      <article className="cardVotacion">
        {valoresCartas.map((valor, index) => (
          <div 
            key={index} 
            className="cardVotacion__item" 
            onClick={() => onCartaSeleccionada(valor)} // Llama al callback con el valor de la carta
          >
            {valor}
          </div>
        ))}
      </article>
    </section>
  );
};

export default CardVotacion;
