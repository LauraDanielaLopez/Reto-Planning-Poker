import React, { useState } from "react";
import Label from "../../atomos/Label/Label";
import Input from "../../atomos/Input/Input";
import ButtonBlanco from "../../atomos/Buttons/ButtonBlanco";
import "./CrearUserAdmin.css";
import { validarNombre } from "../../../helpers/validaciones";
import RadioButton from "../../atomos/RadioButton/RadioButton";
import LayoutCenter from "../../layouts/LayoutCenter/LayoutCenter";
import HeaderCrearPartida from "../../Header/header";

const CrearUserAdmin = () => {
  const [formValues, setFormValues] = useState({
    nombre: "",
    visualizacion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //validacion del nombre 
    if (!validarNombre(formValues.nombre) || !formValues.visualizacion) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    console.log("Formulario enviado:", formValues);
  };

  // Verifica si el nombre es válido y si se seleccionó un radio button
  const formValido = validarNombre(formValues.nombre) && formValues.visualizacion;

  return (
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
  );
};

export default CrearUserAdmin;
