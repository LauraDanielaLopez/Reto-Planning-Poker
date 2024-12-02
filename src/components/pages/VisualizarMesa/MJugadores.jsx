import React from "react";
import CardJugador from "../../atomos/Cards/CardJugador";

const MesaJugadores = ({ jugadores }) => {
  return (
    <div className="mesa__jugadores">
      {jugadores.map((jugador) => (
        <div key={jugador.id} className={`jugador ${jugador.tipo}`}>
          <CardJugador
            tipo={jugador.tipo}
            cartaSeleccionada={jugador.cartaSeleccionada}
            nombre={jugador.nombre}
          />
        </div>
      ))}
    </div>
  );
};

export default MesaJugadores;