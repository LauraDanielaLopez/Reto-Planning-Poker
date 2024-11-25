import React, { useEffect, useState } from "react";
import "./VisualizarMesa.css";
import Circle from "../../atomos/CirclePlayer/CirclePlayer.jsx";
import CardJugador from "../../atomos/Cards/CardJugador.jsx";
import HeaderMesa from "../../Header/headerMesa/HeaderMesa.jsx";
import { obtenerDatos } from "../../../helpers/ajax.js";
import { capitalizeFirstLetter } from "../../../helpers/validaciones.js";

const VisualizarMesa = () => {

  const [partida, setPartida] = useState(null); //almacena datos de la partida
  const [jugadores, setJugadores] = useState([]); //almacena lista de jugadores 

  useEffect(() => {
    const data = async () => {
      try{
        const datosPartida = await obtenerDatos("partidas");
        const datosJugador = await obtenerDatos("usuarios");

        // Filtra la partida activa como la más reciente creada
        const partidaActiva = datosPartida[datosPartida.length - 1]; // Última partida
        console.log("Partida activa:", partidaActiva);

        console.log("Datos de partida:", datosJugador);
        console.log("Datos de partida:", datosPartida);
        

        setPartida(partidaActiva);
        // Filtra los jugadores que pertenecen a esta partida
        setJugadores(datosJugador.filter(j => j.partidaId === partidaActiva?.id));

      }catch(error){
        console.log("error al cargar los datos: ", error);
        
      }
    }
    data();
  }, [])

  if (!partida) return <div>Cargando...</div>;

  
  return (
    <div className="votacion-container">
      <HeaderMesa text={capitalizeFirstLetter(partida?.nombre)} jugador={jugadores[0]?.nombre || "Usuario"} />
      <Circle/>
      <div className="votacion-mesa">
        {jugadores.map((jugador, index) => (
          <div
            className={`votacion-jugador ${jugador.tipo} `}
            key={index}>
            <CardJugador tipo={jugador.tipo} cartaSeleccionada={jugador.cartaSeleccionada} />
            <h3>{capitalizeFirstLetter(jugador.nombre)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizarMesa;
