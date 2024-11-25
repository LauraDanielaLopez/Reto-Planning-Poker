import React from 'react';
import './InvitarJugador.css';

const InvitarJugador = ({ text, type = 'button', disabled = false, onClick }) => {
  return (
    <button className="buttonInvitar" type={type} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default InvitarJugador;