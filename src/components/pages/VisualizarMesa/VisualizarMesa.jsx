import React, { useEffect, useState } from "react";
import "./VisualizarMesa.css";
import Circle from "../../atomos/PlayerTable/PlayerTable.jsx";
import CardJugador from "../../atomos/Cards/CardJugador.jsx";
import HeaderMesa from "../../organismos/headerMesa/HeaderMesa.jsx";
import { obtenerDatos } from "../../../services/ajax.js";
import { capitalizeFirstLetter } from "../../../helpers/validaciones.js";
import CardVotacion from "../../moleculas/CardVotacion/CardVotacion.jsx";
import { useLocation } from "react-router-dom";

const VisualizarMesa = ({ tipo }) => {
  const location = useLocation();
  console.log("Estado recibido en VisualizarMesa:", location.state);
  
  const [partida, setPartida] = useState(null); //almacena datos de la partida
  const [jugadores, setJugadores] = useState([]); //almacena lista de jugadores 
  const [jugadorActual, setJugadorActual] = useState(null);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null); // Estado para la carta seleccionada

  // Verificar si location.state tiene los datos necesarios
  const jugadorId = location.state?.jugadorId;
  const partidaId = location.state?.partidaId;
  const tipoDesdeState = location.state?.tipo || tipo; // Si tipo no está en location usa el tipo recibido por props

  console.log("Valor de tipo desde location.state:", tipoDesdeState);
  console.log("Partida ID recibido: ", partidaId);
  console.log("Jugador ID recibido: ", jugadorId);
  console.log("Tipo de usuario recibido o por props: ", tipoDesdeState); // tipo de USER
  console.log("Estado recibido en VisualizarMesa2:", location.state);

  useEffect(() => {
    console.log("Estado recibido: ---", location.state); //TODO el estado
    const partidaId = location.state?.partidaId;
    console.log("Partida ID recibido: ", partidaId);

    if (!partidaId) {
      console.error("Error: partidaId no está disponible");
      return; // Si no hay partidaId, no continuar con la lógica
    }

    const data = async () => {
      try {
        if (!partidaId) {
          console.error("No se proporcionó un ID de partida");
          return;
        }

        const jugadorId = location.state?.jugadorId;

        const datosPartida = await obtenerDatos("partidas");
        console.log("Partidas obtenidas:  ", datosPartida);

        const datosJugador = await obtenerDatos("usuarios");
        console.log("Jugadores obtenidos: ", datosJugador);
  
        const partidaActiva = datosPartida.find(p => p.id === partidaId);  // Filtramos por la partidaId
        console.log("Partida activa: ", partidaActiva);

        // Asegurarse de que haya una partida activa antes de proceder
        if (!partidaActiva) {
          console.error("No se encontró una partida con el ID proporcionado.");
          setPartida(null); // Asegúrate de establecer un valor incluso en error.
          return;
        }

        console.log("Valor de tipo:", tipoDesdeState); // Aquí debería tener el valor correcto

        const jugadoresFiltrados = tipoDesdeState === "propietario"
            ? datosJugador.filter(user => user.rol.trim().toLowerCase() === "propietario")
            : datosJugador.filter(user => user.rol.trim().toLowerCase() === "invitado");
        
        console.log("Valor de tipo2:", tipoDesdeState); // Aquí debería tener el valor correcto

        if (!jugadoresFiltrados.length) {
            console.warn("No se encontraron jugadores con el rol especificado:", tipoDesdeState);
        }

        console.log("Datos de jugadores recibidos:", datosJugador);
        console.log("Jugadores filtrados:", jugadoresFiltrados);

        setPartida(partidaActiva);
        setJugadores(jugadoresFiltrados);

        if (!["propietario", "invitado"].includes(tipoDesdeState)) {
          console.error("Tipo de usuario no válido:  --- 13", tipoDesdeState);
          return; // Retorna si el tipo no es válido
        }

        if (jugadorId) {
          const jugador = jugadoresFiltrados.find((j) => j.id === jugadorId);
          console.log(jugadorId);
          
          setJugadorActual(jugador);
        }

      } catch (error) {
        console.error("Error al cargar los datos: ", error);
      }
    };

    data();
  }, [location.state, tipoDesdeState]);  // Asegúrate de usar tipoDesdeState aquí

  // Función para manejar la selección de una carta
  const handleCartaSeleccionada = (valor) => {
    setCartaSeleccionada(valor); // Actualiza el valor de la carta seleccionada
    console.log("Carta seleccionada:", valor); // Puedes hacer algo con el valor aquí (como enviarlo a una API)
  };

  // Renderiza un mensaje de carga mientras los datos no están disponibles
  if (!partida || !jugadores.length) return <div>Cargando...</div>;

  return (
    <div className="votacion">
      <HeaderMesa text={capitalizeFirstLetter(partida?.nombre)} jugador={jugadorActual?.nombre || "Usuario"} />
      <Circle />
      <div className="votacion__mesa">
        {jugadores.map((jugador) => (
          <div className={`votacion__jugador ${jugador.tipo}`} key={jugador.id}>
            <CardJugador
              tipo={jugador.tipo}
              cartaSeleccionada={jugador.cartaSeleccionada || cartaSeleccionada} // Pasa la carta seleccionada al CardJugador
              nombre={jugador.nombre}
            />
            <CardVotacion onCartaSeleccionada={handleCartaSeleccionada} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizarMesa;
