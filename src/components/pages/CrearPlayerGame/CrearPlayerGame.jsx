import React, { useState } from "react";
import Label from "../../atomos/Label/Label";
import Input from "../../atomos/Input/Input";
import ButtonBlanco from "../../atomos/Buttons/ButtonBlanco/ButtonBlanco";

import { validarNombre } from "../../../helpers/validaciones";
import { envia } from "../../../services/ajax";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderCrearPartida from "../../organismos/headerInicio/header";
import LayoutCenter from "../../atomos/LayoutCenter/LayoutCenter";
import RadioButton from "../../atomos/RadioButtonSelect/RadioButton";

const CrearPlayerGame = () => {
    const navegacion = useNavigate();
    const location = useLocation();
    const partidaId = location.state?.partidaId;

    const [formValues, setFormValues] = useState({
        nombre: "",
        visualizacion: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validarNombre(formValues.nombre) || !formValues.visualizacion){
            alert("complete todos los campos")
            return
        }

        const nuevoJugador = {
            nombre: formValues.nombre,
            visualizacion: formValues.visualizacion,
            rol: "invitado", // Cambia "propietario" por "invitado" si no es admin
            partidaId: partidaId, // Asocia el usuario a la partida
        };

        console.log(nuevoJugador);
        

        try {
            const respuesta = await envia("usuarios", nuevoJugador);
            alert(`Jugador "${formValues.nombre}" creado.`);
            navegacion("/visualizarMesa", { state: { jugadorId: respuesta.id } });

        } catch (error) {
            console.error("Error al crear el jugador: ", error)
        }
    };

    // Verifica si el nombre es válido y si se seleccionó un radio button
    const formValido = formValues.nombre && formValues.visualizacion; 

    return(
        <div>
      <HeaderCrearPartida text={"Crear usuario"}/>

      <LayoutCenter>
        <section className="FormCrearAdmin">
          <form className="FormCrearAdmin__container" onSubmit={handleSubmit}>
            <Label text="Tu nombre" id="nombre"/>
            <Input value={formValues.nombre} onChange={handleChange} name="nombre" id="nombre"/>
            <div className="radioButtonsContainer"> 
              <RadioButton 
                label="Jugador" 
                value="jugador" 
                name="visualizacion" 
                checked={formValues.visualizacion === "jugador"}
                onChange={handleChange}
              />
              <RadioButton 
                label="Espectador" 
                value="espectador" 
                name="visualizacion" 
                checked={formValues.visualizacion === "espectador"}
                onChange={handleChange}
              />
            </div>
            <ButtonBlanco text="Continuar" type="submit" onClick={handleSubmit} disabled={!formValido} />
            
          </form>
        </section>
      </LayoutCenter>
    </div>
    )
}

export default CrearPlayerGame;

