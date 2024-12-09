import React from "react";
import "./VisualizarEspectador.css";
import HeaderMesa from "../../organismos/headerMesa/HeaderMesa.jsx";
import Circle from "../../atomos/PlayerTable/PlayerTable.jsx";
import CardJugador from "../../atomos/Cards/CardJugador.jsx";

const VisualizarEspectador = ({ jugadores, partida, revelado, promedio, conteoCartas }) => {
  return (
    <div className="espectador">
      <HeaderMesa text={`Partida: ${partida.nombre}`} jugador={"Espectador"} />
      <Circle>
        <p className="mensaje-espectador">Estás viendo la partida como espectador.</p>
      </Circle>
      <div className="votacion__mesa">
        {jugadores.map((jugador) => (
          <CardJugador
            key={jugador.id}
            tipo={jugador.rol}
            cartaSeleccionada={jugador.cartaSeleccionada}
            nombre={jugador.nombre}
            isSelec={jugador.cartaSeleccionada !== null}
            revelado={revelado}
            visualizacion={"espectador"}
          />
        ))}
      </div>
    </div>
  );
};

export default VisualizarEspectador;
