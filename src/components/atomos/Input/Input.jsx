import React from 'react';
import './Input.css';

const Input = ({ value, onChange, name }) => {
  return (
    <input
      className="input"
      type="text"
      value={value}
      onChange={onChange}
      name={name} 
    />
  );
};

export default Input;