import React from 'react';
import './usuario.css';

const ButtonUsuario = ({ text}) => {
  return (
    <div className="buttonUsuario">
        <p className='buttonUsuario__text'>{text}</p>
    </div>
  );
};

export default ButtonUsuario;