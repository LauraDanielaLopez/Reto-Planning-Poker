import React, {  } from "react";
import './navegacion.css';
import InvitarJugador from '../../atomos/Buttons/InvitarJugador/InvitarJugador';
import { useNavigate } from "react-router-dom";
import ButtonUsuario from "../../atomos/Buttons/Usuario/usuario";


const NavegacionNav = ({  openModal, nombre }) => {
  const navegacion = useNavigate();
  
  const handleSubmit = () => {
    openModal();
    navegacion("/invitar");
    
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

 

  return (
    <div>
        <nav className="headerMesa__group">
          <ButtonUsuario text={getInitials(nombre)} />
          <InvitarJugador text="Invitar jugadores" type="submit" onClick={handleSubmit} />
        </nav>
    </div>
  );
};

export default NavegacionNav;
