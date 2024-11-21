import React from 'react';
import './RadioButton.css';

const RadioButton = ({ label, value, name, checked, onChange }) => {
  return (
    <div className="radioButton">
      <label className="radioButton__label"> 
        {label}
        <input
          type="radio"
          className="radioButton__input"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default RadioButton;
