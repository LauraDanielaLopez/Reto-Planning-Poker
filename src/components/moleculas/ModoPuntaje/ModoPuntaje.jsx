import React from "react";
import "./ModoPuntaje.css"

const ModoPuntaje = ({ modosPuntaje, modoSeleccionado, setModoSeleccionado, esAdmin, revelado }) => {
    const handleModoChange = (e) => {
      const nuevoModo = modosPuntaje.find(modo => modo.id === e.target.value);
      setModoSeleccionado(nuevoModo);
    };
  
    return (
      <section className="puntaje">
        <h1 className="puntaje__h1">Modo de Puntaje</h1>
        <select className="puntaje__option" onChange={handleModoChange} value={modoSeleccionado?.id} disabled={revelado}>
          {modosPuntaje.map((modo) => (
            <option className="puntaje__option" key={modo.id} value={modo.id}>
              {modo.nombre}
            </option>
          ))}
        </select>
      </section>
    );
  };
  

export default ModoPuntaje;
