import React, { useEffect, useState } from "react";
import "./VisualizarMesa.css";
import Circle from "../../atomos/PlayerTable/PlayerTable.jsx";
import CardJugador from "../../atomos/Cards/CardJugador.jsx";
import HeaderMesa from "../../organismos/headerMesa/HeaderMesa.jsx";
import { obtenerDatos, actualizarCartaSeleccionada, actualizarRevelado, actualizarModoPuntaje } from "../../../services/ajax.js";
import { capitalizeFirstLetter } from "../../../helpers/validaciones.js";
import CardVotacion from "../../moleculas/CardVotacion/CardVotacion.jsx";
import { useLocation } from "react-router-dom";
import ResultadosCartas from "../../atomos/Cards/ResultadosCartas/ResultadosCartas.jsx";
import ModoPuntaje from "../../moleculas/ModoPuntaje/ModoPuntaje.jsx";

const VisualizarMesa = ({ tipo }) => {
  const location = useLocation();

  const [partida, setPartida] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [jugadorActual, setJugadorActual] = useState(null);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [revelado, setRevelado] = useState(false);
  const [promedio, setPromedio] = useState(0);
  const [conteoCartas, setConteoCartas] = useState({});
  const [todosHanVotado, setTodosHanVotado] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false);
  const [modosPuntaje, setModosPuntaje] = useState([]);
  const [modoSeleccionado, setModoSeleccionado] = useState(null);

  const partidaId = location.state?.partidaId;
  const jugadorId = location.state?.jugadorId;
  const tipoDesdeState = location.state?.tipo || tipo;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datosPartida = await obtenerDatos("partidas");
        const datosJugador = await obtenerDatos("usuarios");
        const modos = await obtenerDatos("modosPuntaje");
        console.log(modos); 
        setModosPuntaje(modos);

        const partidaActiva = datosPartida.find((p) => p.id === partidaId);
        const jugadoresEnPartida = datosJugador.filter(
          (j) => j.partidaId === partidaId
        );

        setPartida(partidaActiva);
        setJugadores(jugadoresEnPartida);
        setRevelado(partidaActiva?.revelado || false);

        const jugador = jugadoresEnPartida.find((j) => j.id === jugadorId);
        setJugadorActual(jugador);

        // Verificar si el usuario es administrador
        if (jugador.rol === "propietario") {
          setEsAdmin(true);
        }

        // Verificar si hay un modo seleccionado previamente en el localStorage
      const modoGuardado = localStorage.getItem("modoSeleccionado");
      if (modoGuardado) {
        setModoSeleccionado(JSON.parse(modoGuardado)); // Recupera el modo seleccionado almacenado
        await actualizarModoPuntaje(partidaId, JSON.parse(modoGuardado));  // Establecemos el modo de puntaje para la partida
      } else if (modos.length > 0) {
        setModoSeleccionado(modos[0]); // Si no hay modo guardado, se selecciona el primero
        await actualizarModoPuntaje(partidaId, modos[0]);  // Establecemos el modo de puntaje para la partida
      }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, [partidaId, jugadorId, tipoDesdeState]);

  const handleModoPuntajeChange = async (nuevoModo) => {
    setModoSeleccionado(nuevoModo);
    console.log("cambiando", nuevoModo);
    
    // Almacena el modo seleccionado en el localStorage
    localStorage.setItem("modoSeleccionado", JSON.stringify(nuevoModo));
  
    try {
      await actualizarModoPuntaje(partidaId, nuevoModo); // Actualizamos el modo de puntaje en el backend
    } catch (error) {
      console.error("Error al actualizar el modo de puntaje:", error);
    }
  };
  
  

  const handleCartaSeleccionada = async (valor) => {
    if (jugadorActual.visualizacion !== "espectador") {
      setCartaSeleccionada(valor);
      setJugadores((prev) =>
        prev.map((jugador) =>
          jugador.id === jugadorActual.id
            ? { ...jugador, cartaSeleccionada: valor }
            : jugador
        )
      );
      await actualizarCartaSeleccionada(jugadorActual.id, valor);
    }
  };

  const calcularPromedioYConteo = () => {
    const votos = jugadores
      .filter((j) => j.cartaSeleccionada)
      .map((j) => parseInt(j.cartaSeleccionada, 10))
      .filter((val) => !isNaN(val));

    const conteo = votos.reduce((acc, voto) => {
      acc[voto] = (acc[voto] || 0) + 1;
      return acc;
    }, {});

    const promedio = votos.length > 0 ? votos.reduce((a, b) => a + b, 0) / votos.length : 0;

    setPromedio(promedio);
    setConteoCartas(conteo);
  };

  const revelarCartas = async () => {
    const jugadoresActivos = jugadores.filter((j) => j.visualizacion !== "espectador");
    const todosVotaron = jugadoresActivos.every((j) => j.cartaSeleccionada !== null);

    if (todosHanVotado) {
      try {
        console.log("Revelar Cartas clicado");
        await actualizarRevelado(partida.id, true); // true indica que las cartas se revelaron
        setRevelado(true);
        calcularPromedioYConteo();
      } catch (error) {
        console.error("Error al revelar cartas:", error);
      }
    } else {
      alert("No todos los jugadores han votado.");
    }
  };

  const nuevaVotacion = async () => {
    // Resetear todo para la nueva votación
    setRevelado(false);
    setPromedio(0);
    setConteoCartas({});

    // Resetea la cartaSeleccionada para cada jugador
    setJugadores((prev) =>
      prev.map((jugador) => ({
        ...jugador,
        cartaSeleccionada: null,  // Asegúrate de que se resetee
      }))
    );

    // Resetear la carta seleccionada también en el estado actual
    setCartaSeleccionada(null);

    // Enviar la actualización al backend para resetear la carta seleccionada
    for (const jugador of jugadores) {
      await actualizarCartaSeleccionada(jugador.id, null);
    }

    // Actualizar el estado revelado a false en el backend
    try {
      await actualizarRevelado(partida.id, false);  // Esto asegura que el estado revelado en el backend se cambie a false
    } catch (error) {
      console.error("Error al actualizar el estado revelado:", error);
    }
  };

  useEffect(() => {
    const todosHanVotado = jugadores
      .filter((j) => j.visualizacion !== "espectador") // Excluye espectadores
      .every((j) => j.cartaSeleccionada !== null);
    setTodosHanVotado(todosHanVotado);
  }, [jugadores]);
  

  if (!partida || !jugadores.length) return <div>Cargando...</div>;

  return (
    <div className="votacion">
      <HeaderMesa
        text={capitalizeFirstLetter(partida?.nombre)}
        jugador={jugadorActual?.nombre || "Usuario"}
      />
      {/* aqui que se generen os cardJugador invitados */}
      <Circle>
        {esAdmin && (
            <ModoPuntaje
            modosPuntaje={modosPuntaje}
            modoSeleccionado={modoSeleccionado}
            setModoSeleccionado={handleModoPuntajeChange}  // Aquí pasamos la función para manejar el cambio
            esAdmin={esAdmin}
            revelado={revelado}
          />
          )}
        {esAdmin && !revelado && (
          <button
            className="btn-revelar"
            onClick={revelarCartas}
            disabled={!todosHanVotado} // Deshabilitado si no todos los jugadores activos han votado
          >
            Revelar Cartas
          </button>
        )}
        {revelado && (
          <button
            className="btn-revelar"
            onClick={nuevaVotacion}
          >
            Nueva Votación
          </button>
        )}
      </Circle>
      <div className="votacion__mesa contenedor">
        {jugadores.map((jugador) => (
          <div className="card__container" key={jugador.id}>
            <CardJugador
              tipo={jugador.rol}
              cartaSeleccionada={jugador.cartaSeleccionada}
              nombre={capitalizeFirstLetter(jugador.nombre)} 
              isSelec={jugador.cartaSeleccionada !== null}
              revelado={revelado}
              visualizacion={jugador.visualizacion}
            />
          </div>
        ))}
      </div>
      {jugadorActual?.visualizacion !== "espectador" &&
        !revelado && (
          <div className="votacion__acciones">
            <CardVotacion
              onCartaSeleccionada={handleCartaSeleccionada}
              valoresCartas={modoSeleccionado ? modoSeleccionado.valores : []}
            />
          </div>
        )}
      {revelado && (
        <ResultadosCartas
          conteoCartas={conteoCartas}
          promedio={promedio}
        />
      )}
    </div>
  );
};


export default VisualizarMesa;
