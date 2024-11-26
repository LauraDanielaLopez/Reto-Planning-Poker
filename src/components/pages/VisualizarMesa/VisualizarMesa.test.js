import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import VisualizarMesa from "./VisualizarMesa"; // Asegúrate de la ruta correcta del componente
import { obtenerDatos } from "../../../services/ajax.js";

// Mock de la función obtenerDatos para simular la llamada a la API
jest.mock("../../../services/ajax.js");

describe("VisualizarMesa", () => {
  beforeEach(() => {
    // Simula la respuesta de la API para "partidas" y "usuarios"
    obtenerDatos.mockResolvedValueOnce([
      { id: 1, nombre: "Partida 1" },
    ]) // Partidas
    .mockResolvedValueOnce([
      { id: 1, nombre: "Jugador 1", partidaId: 1, tipo: "tipo1", cartaSeleccionada: "carta1" },
      { id: 2, nombre: "Jugador 2", partidaId: 1, tipo: "tipo2", cartaSeleccionada: "carta2" },
    ]); // Usuarios
  });

  test("debe renderizar correctamente el componente VisualizarMesa", async () => {
    render(<VisualizarMesa />);

    // Verifica que el mensaje 'Cargando...' se muestra mientras se obtiene la partida
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();

    // Espera a que los datos se carguen
    await waitFor(() => expect(obtenerDatos).toHaveBeenCalledTimes(2));

    // Verifica que el nombre de la partida se muestra correctamente
    expect(screen.getByText(/Partida 1/i)).toBeInTheDocument();

    // Verifica que los jugadores están siendo renderizados
    expect(screen.getByText(/Jugador 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Jugador 2/i)).toBeInTheDocument();

    // Verifica que los componentes Circle y CardJugador están presentes
    expect(screen.getByRole("img", { name: /circle/i })).toBeInTheDocument(); // Si Circle tiene una etiqueta <img>
    expect(screen.getByText(/carta1/i)).toBeInTheDocument(); // Dependiendo de lo que renderice CardJugador
    expect(screen.getByText(/carta2/i)).toBeInTheDocument();
  });

  test("debe manejar el caso de ausencia de jugadores", async () => {
    obtenerDatos.mockResolvedValueOnce([{ id: 1, nombre: "Partida 1" }]); // Simula una partida sin jugadores

    render(<VisualizarMesa />);

    // Verifica que se cargue sin jugadores
    await waitFor(() => expect(obtenerDatos).toHaveBeenCalledTimes(2));

    // Verifica que no aparezca ningún jugador
    expect(screen.queryByText(/Jugador 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Jugador 2/i)).not.toBeInTheDocument();
  });
});
