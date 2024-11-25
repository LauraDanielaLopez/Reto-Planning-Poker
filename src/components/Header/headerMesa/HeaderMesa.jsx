import React from "react";
import './HeaderMesa.css';
import InvitarJugador from '../../atomos/Buttons/InvitarJugador/InvitarJugador';
import { useNavigate } from "react-router-dom";
import ButtonUsuario from "../../atomos/Buttons/Usuario/usuario";

const HeaderMesa = ({ text, jugador }) => {
  const basePath = process.env.NODE_ENV === "production" ? "/Reto-Planning-Poker" : "";
  const navegacion = useNavigate();

  const handleSubmit = () => {
    navegacion("/");
  };

  const getInitials = (nombre) => {
    if (typeof nombre === "string") {
      const palabras = nombre.trim().split(" "); // Divide el nombre en palabras, eliminando espacios adicionales
      if (palabras.length === 1) {
        // Si solo hay una palabra, toma las dos primeras letras de la misma
        return palabras[0].slice(0, 2).toUpperCase();
      }
      // Si hay más de una palabra, toma la primera letra de cada una y únelas
      return palabras
        .map((word) => word[0]?.toUpperCase()) // Toma la primera letra de cada palabra
        .join("") // Une las letras
        .slice(0, 2); // Limita a las primeras dos letras
    }
    return "";
  };

  const inicialesJugador = getInitials(jugador);
  

  return (
    <header className="headerMesa">
      <div className="headerMesa__content">
      <img
        src={`${basePath}/isotipoP.png`}
        alt="Isotipo de pragma"
        className="headerMesa__logo"
      />
        <h1 className="headerMesa__text">{text}</h1>
        <div className="headerMesa__group">
        <ButtonUsuario text={`${inicialesJugador}`} />
        <InvitarJugador text="Invitar jugadores" type="submit" onClick={handleSubmit} />
        </div>
      </div>
    </header>
  );
};

export default HeaderMesa;
