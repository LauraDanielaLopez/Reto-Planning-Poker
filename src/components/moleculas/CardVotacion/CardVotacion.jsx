import React from "react";
import './CardVotacion.css'

const CardVotacion =() => {
    return (
    
    <section className="cardV">
        <p className="cardV__text">Elige una carta 👇</p>
        <article className={`cardVotacion`}>
            <div className="cardVotacion__item">0</div>
            <div className="cardVotacion__item">1</div>
            <div className="cardVotacion__item">3</div>
            <div className="cardVotacion__item">5</div>
            <div className="cardVotacion__item">8</div>
            <div className="cardVotacion__item">13</div>
            <div className="cardVotacion__item">21</div>
            <div className="cardVotacion__item">34</div>
            <div className="cardVotacion__item">55</div>
            <div className="cardVotacion__item">89</div>
            <div className="cardVotacion__item">?</div>
            <div className="cardVotacion__item">☕</div>
        </article>
    </section>
    )
}

export default CardVotacion;
