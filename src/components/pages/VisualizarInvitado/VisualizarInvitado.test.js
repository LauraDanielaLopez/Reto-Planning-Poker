import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import VisualizarInvitado from "./VisualizarInvitado";
import { BrowserRouter as Router } from "react-router-dom";
import { obtenerDatos } from "../../../services/ajax.js";

// Mocks
jest.mock("../../../services/ajax.js", () => ({
  obtenerDatos: jest.fn(),
}));

// Mock de useLocation
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

describe("VisualizarInvitado Component", () => {
  const mockPartidaData = [{ id: 1, nombre: "Partida Test" }];
  const mockJugadorData = [
    { id: 1, nombre: "Jugador 1", partidaId: 1, rol: "invitado", cartaSeleccionada: null },
    { id: 2, nombre: "Jugador 2", partidaId: 1, rol: "jugador", cartaSeleccionada: null },
  ];

  beforeEach(() => {
    // Configuramos los valores que se esperan en useLocation
    jest.spyOn(React, "useState").mockImplementation((init) => [init, jest.fn()]);

    require("react-router-dom").useLocation.mockReturnValue({
      state: { partidaId: 1, jugadorId: 1 },
    });

    obtenerDatos.mockResolvedValueOnce(mockPartidaData); // Mock de la llamada a "partidas"
    obtenerDatos.mockResolvedValueOnce(mockJugadorData); // Mock de la llamada a "usuarios"
  });

  test("debe mostrar 'Cargando...' mientras se espera la carga de datos", () => {
    render(
      <Router>
        <VisualizarInvitado />
      </Router>
    );
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  test("debe renderizar los jugadores después de obtener los datos", async () => {
    render(
      <Router>
        <VisualizarInvitado />
      </Router>
    );

    // Usamos findByText que automáticamente espera a que el texto aparezca
    expect(await screen.findByText("Jugador 1")).toBeInTheDocument();
    expect(await screen.findByText("Jugador 2")).toBeInTheDocument();
  });

  test("debe renderizar la carta de votación solo para el jugador actual", async () => {
    render(
      <Router>
        <VisualizarInvitado />
      </Router>
    );

    // Usamos findByText para esperar a que aparezca el texto
    expect(await screen.findByText("Jugador 1")).toBeInTheDocument();
    expect(await screen.findByText("Carta de Votación")).toBeInTheDocument();
    expect(await screen.findByText("Jugador 2")).toBeInTheDocument();
    expect(screen.queryByText("Carta de Votación")).not.toBeInTheDocument();
  });

  test("debe manejar la selección de carta y actualizar el estado", async () => {
    render(
      <Router>
        <VisualizarInvitado />
      </Router>
    );

    // Esperamos a que los datos se hayan cargado
    await screen.findByText("Jugador 1");

    const cartaVotacionButton = screen.getByText("Carta de Votación");
    fireEvent.click(cartaVotacionButton); // Simulamos la selección de carta

    // Verificamos que el estado de la carta seleccionada se actualizó
    expect(await screen.findByText("Carta seleccionada:")).toBeInTheDocument();
  });

  test("debe mostrar un mensaje de error si la solicitud de datos falla", async () => {
    obtenerDatos.mockRejectedValueOnce(new Error("Error en la carga"));

    render(
      <Router>
        <VisualizarInvitado />
      </Router>
    );

    // Esperamos que se muestre el mensaje de error
    expect(await screen.findByText("Cargando...")).toBeInTheDocument();
    expect(await screen.findByText("Error al cargar datos:")).toBeInTheDocument();
  });
});
