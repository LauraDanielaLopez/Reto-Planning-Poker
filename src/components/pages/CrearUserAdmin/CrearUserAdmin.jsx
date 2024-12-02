import React, { useState } from "react";
import Label from "../../atomos/Label/Label";
import Input from "../../atomos/Input/Input";
import ButtonBlanco from "../../atomos/Buttons/ButtonBlanco/ButtonBlanco";
import "./CrearUserAdmin.css";
import { validarNombre } from "../../../helpers/validaciones";
import RadioButton from "../../atomos/RadioButtonSelect/RadioButton";
import LayoutCenter from "../../atomos/LayoutCenter/LayoutCenter";
import HeaderCrearPartida from "../../organismos/headerInicio/header";
import { envia } from "../../../services/ajax";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const CrearUserAdmin = () => {
  const navegacion = useNavigate();
  const location = useLocation();
  const partidaId = location.state?.partidaId;
  const { v4: uuidv4 } = require('uuid');
  // Genera un uuid completo y toma los primeros 4 caracteres
  const id = uuidv4().substring(0, 4);


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
    
    //validacion del nombre 
    if (!validarNombre(formValues.nombre) || !formValues.visualizacion) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    
    
    // Crear un nuevo usuario en el backend
    const nuevoUsuario = {
      id: id,  // Genera un id único para cada usuario
      nombre: formValues.nombre,
      visualizacion: formValues.visualizacion,
      rol: partidaId ? "propietario" : "invitado", // Detecta el rol automáticamente
      partidaId: partidaId,
      cartaSeleccionada: null,
    };
    console.log(nuevoUsuario);
    

    try {
      // Guardar el usuario en el localStorage
      localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
      
      await envia("usuarios", nuevoUsuario);
      setFormValues({ nombre: "", visualizacion: "" });
      alert(`Usuario "${formValues.nombre}" creado exitosamente.`);

      if (!nuevoUsuario.partidaId || !nuevoUsuario.id || !nuevoUsuario.rol) {
        console.error("Datos faltantes para navegar: ", nuevoUsuario);
        return;
      }

      console.log("Datos para navegar:", {
        partidaId: nuevoUsuario.partidaId,
        jugadorId: nuevoUsuario.id,
        tipo: nuevoUsuario.rol,
      });
      
      // Redirigir al usuario a la ruta correspondiente
      navegacion("/visualizarMesa", {
        state: { partidaId: nuevoUsuario.partidaId, jugadorId: nuevoUsuario.id, tipo: nuevoUsuario.rol },
      });

  } catch (error) {
      console.log("Error al crear usuario: ", error);
    }
  };
  

  // Verifica si el nombre es válido y si se seleccionó un radio button
  const formValido = formValues.nombre && formValues.visualizacion; 

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
