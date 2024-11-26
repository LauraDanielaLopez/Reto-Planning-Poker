import React, { useState } from 'react';
import Label from '../../atomos/Label/Label.jsx';
import Input from '../../atomos/Input/Input.jsx';
import ButtonBlanco from '../../atomos/Buttons/ButtonBlanco/ButtonBlanco.jsx';
import './CrearPartida.css';
import { validarCrearPartida } from '../../../helpers/validaciones.js';
import LayoutCenter from '../../atomos/LayoutCenter/LayoutCenter.jsx';
import HeaderCrearPartida from '../../organismos/headerInicio/header.jsx';
import { useNavigate } from "react-router-dom";
import { envia } from '../../../services/ajax.js';

const CrearPartida = () => {
  const [gameName, setGameName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navegacion = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setGameName(value);
    setIsValid(validarCrearPartida(value));
  };

  const handleSubmit = async () => {
    if (isValid) {
        try {
            const nuevaPartida = { nombre: gameName };
            console.log("Nueva partida:", nuevaPartida);

            const partidaCreada = await envia("partidas", nuevaPartida);

            if (!partidaCreada) {
                console.error("Error: No se pudo crear la partida");
                return;
            }

            // Limpia el estado después de crear
            setGameName("");
            setIsValid(false);

            console.log(`Partida creada: ${partidaCreada.nombre}`);
            navegacion("/crearAdmin", { state: { partidaId: partidaCreada.id } });
        } catch (error) {
            console.log("Error a crear partida: ", error);
        }
    }
};


  return (
    <div>
      <HeaderCrearPartida text={"Iniciar partida"}/>
      
      <LayoutCenter>
        <div className="formCrearPartida">
          <Label text="Nombra la partida" id="partida"/>
          <Input value={gameName} onChange={handleChange} name="partida" id="partida"/>
          <ButtonBlanco text="Crear partida" type="submit" onClick={handleSubmit} disabled={!isValid} />     
        </div>
      </LayoutCenter>
    </div>
    
  );
};

export default CrearPartida;
