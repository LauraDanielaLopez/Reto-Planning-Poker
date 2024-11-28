import React, { useState } from "react";
import './HeaderMesa.css';
import NavegacionNav from "../../moleculas/navegacion/navegacion";

const HeaderMesa = ({ text, jugador }) => {
  const basePath = process.env.NODE_ENV === "production" ? "/Reto-Planning-Poker" : "";
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }
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
        <NavegacionNav text={text} jugador={jugador} closeModal={handleModalClose} openModal={handleModalOpen} modalOpen={modalOpen}/>
      </section>
    </header>
  );
};

export default HeaderMesa;
