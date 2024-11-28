import React from "react";
import './CardVotacion.css'

const CardVotacion =() => {
    return (
    
    <section className="cardV">
        <p className="cardV__text">Elige una carta 👇</p>
        <article className={`cardVotacion`}>
            {["0", "1", "3", "5", "8", "13", "21", "34", "55", "89", "?", "☕"].map((valor, index) => (
            <div key={index} className="cardVotacion__item">{valor}</div>
          ))}
        </article>
    </section>
    )
}

export default CardVotacion;
