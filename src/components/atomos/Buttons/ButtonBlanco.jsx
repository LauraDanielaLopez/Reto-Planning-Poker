import React from 'react';
import './ButtonBlanco.css';

const ButtonBlanco = ({ text, onClick, disabled }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default ButtonBlanco;