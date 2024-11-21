import React from 'react';
import './header.css';

const HeaderCrearPartida = ({text}) => {
  return (
    <header className="HeaderCrearPartida">
      <div className="HeaderCrearPartida__content">
        <img src="/isotipo.png" alt="Isotipo de pragma" className="HeaderCrearPartida__logo" />
        <h1 className="HeaderCrearPartida__text">{text}</h1>
      </div>
    </header>
  );
};

export default HeaderCrearPartida;
