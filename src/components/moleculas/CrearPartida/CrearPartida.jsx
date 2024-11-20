import React, { useState } from 'react';
import Label from '../../atomos/Label/Label.jsx';
import Input from '../../atomos/Input/Input.jsx';
import Button from '../../atomos/Buttons/ButtonBlanco.jsx';
import './CrearPartida.css';
import { validarCrearPartida } from '../../../helpers/validaciones.js';
import LayoutCenter from '../../layouts/LayoutCenter/LayoutCenter.jsx';
import HeaderCrearPartida from '../../Header/header.jsx';

const CrearPartida = () => {
  const [gameName, setGameName] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setGameName(value);
    setIsValid(validarCrearPartida(value));
  };

  const handleSubmit = () => {
    if (isValid) {
      alert(`Partida creada: ${gameName}`);
    }
  };

  return (
    <div>
      <HeaderCrearPartida />
      <LayoutCenter> 
        <div className="formCrearPartida">
          <Label text="Nombra la partida" />
          <Input value={gameName} onChange={handleChange} />
          <Button text="Crear partida" onClick={handleSubmit} disabled={!isValid} />
        </div>
      </LayoutCenter>
    </div> 
    
  );
};

export default CrearPartida;
