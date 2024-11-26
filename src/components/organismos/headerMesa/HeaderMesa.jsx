import React from "react";
import './HeaderMesa.css';
import NavegacionNav from "../../moleculas/navegacion/navegacion";

const HeaderMesa = ({ text, jugador }) => {
  const basePath = process.env.NODE_ENV === "production" ? "/Reto-Planning-Poker" : "";
  

  return (
    <header className="headerMesa">
      <section className="headerMesa__content">
        <figure >
          <img
            src={`${basePath}/isotipoP.png`}
            alt="Isotipo de pragma"
            className="headerMesa__logo"
          />
        </figure>

        <h1 className="headerMesa__text">{text}</h1>
        <NavegacionNav text={text} jugador={jugador} />
      </section>
    </header>
  );
};

export default HeaderMesa;
