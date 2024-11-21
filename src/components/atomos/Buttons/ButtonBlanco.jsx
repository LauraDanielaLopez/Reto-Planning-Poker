import React from 'react';
import './ButtonBlanco.css';

const ButtonBlanco = ({ text, type, disabled, onClick }) => {
  return (
    <button className="button" type={type} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonBlanco;