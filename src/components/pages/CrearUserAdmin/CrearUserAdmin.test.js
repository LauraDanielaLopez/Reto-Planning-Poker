import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CrearUserAdmin from "./CrearUserAdmin.jsx";
import { validarNombre } from "../../../helpers/validaciones.js";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { envia } from "../../../services/ajax";

// Mock para las funciones de validación y AJAX
jest.mock("../../../helpers/validaciones", () => ({
  validarNombre: jest.fn(),
}));

jest.mock("../../../services/ajax", () => ({
  envia: jest.fn(),
}));

describe("CrearUserAdmin", () => {
  beforeEach(() => {
    validarNombre.mockClear();
    envia.mockClear();
  });

  test("Debe renderizar correctamente el componente", () => {
    render(
      <Router>
        <CrearUserAdmin />
      </Router>
    );
    expect(screen.getByText("Tu nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Jugador")).toBeInTheDocument();
    expect(screen.getByLabelText("Espectador")).toBeInTheDocument();
    expect(screen.getByText("Continuar")).toBeInTheDocument();
  });

  test("Debe mostrar una alerta si el formulario está incompleto", () => {
    render(<CrearUserAdmin />);
    validarNombre.mockReturnValue(false);
    
    const inputNombre = screen.getByRole("textbox", { name: /nombre/i });
    fireEvent.change(inputNombre, { target: { value: "!" } });

    const boton = screen.getByText("Continuar");
    fireEvent.click(boton);

    expect(validarNombre).toHaveBeenCalledWith("!");
    expect(screen.getByText("Por favor, completa todos los campos.")).toBeInTheDocument();
  });

  test("Debe habilitar el botón si el formulario es válido", () => {
    render(<CrearUserAdmin />);
    validarNombre.mockReturnValue(true);

    const inputNombre = screen.getByRole("textbox", { name: /nombre/i });
    const radioJugador = screen.getByLabelText("Jugador");
    const boton = screen.getByText("Continuar");

    fireEvent.change(inputNombre, { target: { value: "Laura" } });
    fireEvent.click(radioJugador);

    expect(boton).not.toBeDisabled();
  });

  test("Debe llamar a handleSubmit con los valores correctos y crear un usuario", async () => {
    render(<CrearUserAdmin />);

    const inputNombre = screen.getByRole("textbox", { name: /nombre/i });
    const radioJugador = screen.getByLabelText("Jugador");
    const boton = screen.getByText("Continuar");

    fireEvent.change(inputNombre, { target: { value: "Laura" } });
    fireEvent.click(radioJugador);

    validarNombre.mockReturnValue(true);
    
    fireEvent.click(boton);

    await waitFor(() => {
      expect(envia).toHaveBeenCalledWith("usuarios", {
        id: expect.any(String),
        nombre: "Laura",
        visualizacion: "jugador",
        rol: "invitado",
        partidaId: null,
        cartaSeleccionada: null,
      });
    });

    expect(screen.getByText("Usuario \"Laura\" creado exitosamente.")).toBeInTheDocument();
  });

  test("Debe navegar a la vista correspondiente dependiendo del rol", async () => {
    render(<CrearUserAdmin />);

    const inputNombre = screen.getByRole("textbox", { name: /nombre/i });
    const radioJugador = screen.getByLabelText("Jugador");
    const boton = screen.getByText("Continuar");

    fireEvent.change(inputNombre, { target: { value: "Laura" } });
    fireEvent.click(radioJugador);

    validarNombre.mockReturnValue(true);
    
    fireEvent.click(boton);

    await waitFor(() => {
      expect(envia).toHaveBeenCalled();
    });

    expect(screen.getByText("Usuario \"Laura\" creado exitosamente.")).toBeInTheDocument();
  });
});
