import React from "react";

const ModoPuntaje = ({ modoSeleccionado, setModoSeleccionado, esAdmin, revelado }) => {
  const modos = [
    { nombre: "Fibonacci", 
        valores: ["0", "1", "3", "5", "8", "13", "21", "34", "55", "89", "?", "☕"] 

    },
    { nombre: "De 2 en 2", 
        valores: ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"] 

    },
    { nombre: "De 5 en 5", 
        valores: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"] 
    },
  ];

  const handleChange = (e) => {
    const modo = modos.find((m) => m.nombre === e.target.value);
    setModoSeleccionado(modo);
  };

  return (
    <div className="modoPuntaje">
      {esAdmin && !revelado && (
        <>
          <label htmlFor="modoPuntaje">Modo de Puntaje:</label>
          <select
            id="modoPuntaje"
            value={modoSeleccionado.nombre}
            onChange={handleChange}
          >
            {modos.map((modo) => (
              <option key={modo.nombre} value={modo.nombre}>
                {modo.nombre}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default ModoPuntaje;
