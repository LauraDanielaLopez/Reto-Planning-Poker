import React from 'react';
import './ButtonMorado.css';

const ButtonMorado = ({ text, type, disabled, onClick }) => {
  return (
    <button className="button" type={type} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonMorado;