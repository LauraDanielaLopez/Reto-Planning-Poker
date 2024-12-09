import React, { useEffect, useState } from "react";
import Circle from "../../atomos/PlayerTable/PlayerTable.jsx";
import CardJugador from "../../atomos/Cards/CardJugador.jsx";
import HeaderMesa from "../../organismos/headerMesa/HeaderMesa.jsx";
import { obtenerDatos, envia, actualizarCartaSeleccionada } from "../../../services/ajax.js";
import { useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../helpers/validaciones.js";
import CardVotacion from "../../moleculas/CardVotacion/CardVotacion.jsx";
import ResultadosCartas from "../../atomos/Cards/ResultadosCartas/ResultadosCartas.jsx"; // Asegúrate de importar ResultadosCartas
import ModoPuntaje from "../../moleculas/ModoPuntaje/ModoPuntaje.jsx";

const VisualizarInvitado = () => {
  const location = useLocation();
  const [partida, setPartida] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [jugadorActual, setJugadorActual] = useState(null);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [revelado, setRevelado] = useState(false);
  const [promedio, setPromedio] = useState(0); // Estado para promedio
  const [conteoCartas, setConteoCartas] = useState({}); // Estado para conteo de cartas
  const [modoSeleccionado, setModoSeleccionado] = useState(null);

  const partidaId = location.state?.partidaId;
  const jugadorId = location.state?.jugadorId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datosPartida = await obtenerDatos("partidas");
        const datosJugador = await obtenerDatos("usuarios");
        const modos = await obtenerDatos("modosPuntaje");

        const partidaActiva = datosPartida.find((p) => p.id === partidaId);
        const jugadoresEnPartida = datosJugador.filter(
          (j) => j.partidaId === partidaId
        );

        setPartida(partidaActiva);
        setJugadores(jugadoresEnPartida);
        setRevelado(partidaActiva?.revelado || false);

        const jugador = jugadoresEnPartida.find((j) => j.id === jugadorId);
        setJugadorActual(jugador);

        // Establece el modo seleccionado desde el backend o desde el localStorage
        const modoGuardado = localStorage.getItem("modoSeleccionado");
        if (modoGuardado) {
          setModoSeleccionado(JSON.parse(modoGuardado));  // Recupera el modo guardado
        } else if (modos.length > 0) {
          setModoSeleccionado(modos[0]);  // Si no hay modo guardado, selecciona el primero
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, [partidaId, jugadorId]);

  const handleCartaSeleccionada = async (valor) => {
    setCartaSeleccionada(valor);
    setJugadores((prev) =>
      prev.map((jugador) =>
        jugador.id === jugadorActual.id
          ? { ...jugador, cartaSeleccionada: valor }
          : jugador
      )
    );
    await actualizarCartaSeleccionada(jugadorActual.id, valor);
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

  useEffect(() => {
    if (revelado) {
      calcularPromedioYConteo();
    }
  }, [revelado, jugadores]);

  if (!partida || !jugadores.length) return <div>Cargando...</div>;

  return (
    <div className="votacion">
      <HeaderMesa
        text={capitalizeFirstLetter(partida?.nombre)}
        jugador={jugadorActual?.nombre || "Usuario"}
      />
      {/* <Circle /> */}
      <Circle>
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

      {/* Sección de resultados visible cuando las cartas están reveladas */}
      {revelado && (
      <ResultadosCartas
        conteoCartas={conteoCartas}
        promedio={promedio} // Mostrar solo si se ha revelado
      />
    )}
    </div>
  );
};

export default VisualizarInvitado;
