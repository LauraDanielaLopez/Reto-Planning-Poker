import React from 'react';
import './Label.css';

const Label = ({ text, id }) => {
  return <label className="label" htmlFor={id}>{text}</label>;
};

export default Label;