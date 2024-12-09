import React from "react";
import "./ResultadosCartas.css";

const ResultadosCartas = ({ conteoCartas, promedio }) => {
  return (
    <section className="resultado">
      <article className="resultado__container">
        {Object.entries(conteoCartas).map(([carta, cantidad]) => (
          <div className="carta" key={carta}>
            <div className="carta__result">
              <div className="carta__valor">{carta}</div>
            </div>
            <div className="carta__votos">{cantidad} votos</div>
          </div>
        ))}
      </article>
      <article className="promedio">
        <h1 className="promedio__h1">Promedio:</h1>
        <p className="promedio__p">{promedio.toFixed(2)}</p>
      </article>
    </section>
  );
};

export default ResultadosCartas;
