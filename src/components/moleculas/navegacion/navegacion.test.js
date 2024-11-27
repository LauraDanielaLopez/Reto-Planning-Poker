import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Para simular rutas
import NavegacionNav from "./navegacion.jsx";
import "@testing-library/jest-dom";

describe("NavegacionNav", () => {
  test("Renderiza correctamente los elementos de navegación", () => {
    render(
      <MemoryRouter>
        <NavegacionNav text="Invitar jugadores" jugador="Laura Gómez" />
      </MemoryRouter>
    );

    expect(screen.getByText("Invitar jugadores")).toBeInTheDocument();
    expect(screen.getByText("LG")).toBeInTheDocument(); // Iniciales de Laura Gómez
  });

  test("Genera correctamente las iniciales de un jugador", () => {
    render(
      <MemoryRouter>
        <NavegacionNav text="Invitar jugadores" jugador="Pedro Alvarado" />
      </MemoryRouter>
    );

    expect(screen.getByText("PA")).toBeInTheDocument(); // Iniciales de Pedro Alvarado
  });

  test("Redirige a la ruta /invitar al hacer clic en el botón", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <NavegacionNav text="Invitar jugadores" jugador="Pedro Alvarado" />
      </MemoryRouter>
    );

    const button = screen.getByText("Invitar jugadores");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/invitar");
  });
});
