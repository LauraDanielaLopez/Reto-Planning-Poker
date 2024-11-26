import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CrearUserAdmin from "./CrearUserAdmin.jsx";
import { validarNombre } from "../../../helpers/validaciones.js";
import '@testing-library/jest-dom';

// mockear la función que valida el nombre
jest.mock("../../../helpers/validaciones", () => ({
  validarNombre: jest.fn(),
}));

//agrupamos todas las pruebas del componente CrearUserAdmin
describe("CrearUserAdmin", () => {
    //antes de cada prueba, limpiamos el mock
  beforeEach(() => {
    validarNombre.mockClear();
  });

  /**
   * Prueba 1: verificamos que el componente se renderiza correctamente
   * veriificamos que los elementos clave esten presentes en e DOM.
   */
  test("Debe renderizar correctamente el componente", () => {
    render(<CrearUserAdmin />);

    // verificamos que los elementos principales esten pesentes
    expect(screen.getByText("Tu nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Jugador")).toBeInTheDocument();
    expect(screen.getByLabelText("Espectador")).toBeInTheDocument();
    expect(screen.getByText("Continuar")).toBeInTheDocument();
  });

  /**
   * Prueba 2: vaidamos el comportamiento al enviar un formulario incompleto
   * simulamos un nombre no válido y verificamos que el sistema reacciona correctamente.
   */
  test("Debe mostrar una alerta si el formulario está incompleto", () => {
    render(<CrearUserAdmin />);

    // Mock para que la validación del nombre devuelva falso (nombre invalido)
    validarNombre.mockReturnValue(false);

     // Simulamos escribir un nombre no válido
    const inputNombre = screen.getByRole("textbox", { name: /nombre/i });
    fireEvent.change(inputNombre, { target: { value: "!" } });

    // Simulamos clic en el botón continuar sin aver llenado el form
    const boton = screen.getByText("Continuar");
    fireEvent.click(boton);

    // validamos que la función de validación fue llamada vacia
    expect(validarNombre).toHaveBeenCalledWith("");
  });

  /**
   * Prueba 3: Habilitamos el botón si el formulario es válido
   * simulamos un nimbre válido y seleccionamos un radio button.
   * verificamos que el botón de continuar está habilitado.
   */
  test("Debe habilitar el botón si el formulario es válido", () => {
    render(<CrearUserAdmin />);

    //mock que devuelve verdadero  nombre vaido
    validarNombre.mockReturnValue(true);

    // obtenemos los campos del formulario
    const inputNombre = screen.getByRole("textbox", { name: /nombre/i });
    const radioJugador = screen.getByLabelText("Jugador");
    const boton = screen.getByText("Continuar");

    // simulamos que el user escribe un nombre y selecciona un rol
    fireEvent.change(inputNombre, { target: { value: "Laura" } });
    fireEvent.click(radioJugador);

    // Verificar que el botón se habilita 
    expect(boton).not.toBeDisabled();
  });

  /**
   * Prueba 4: validamos el envio del form con los valores correctos
   * simulamos un formulario válido y verificamos que el envio se realiza correctamente.
   */
  test("Debe llamar al handleSubmit con los valores correctos", () => {
    //espiar a consoe.og
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<CrearUserAdmin />);

    // obtenemos los campos del formulario
    const inputNombre = screen.getByRole("textbox", { name: /nombre/i });
    const radioJugador = screen.getByLabelText("Jugador");
    const boton = screen.getByText("Continuar");

    // simulamos que el user escribe un nombre y selecciona un rol
    fireEvent.change(inputNombre, { target: { value: "Laura" } });

    fireEvent.click(radioJugador);

    // Asegúrate de que la validación devuelve true
    validarNombre.mockReturnValue(true);

    // Simulamos un clic en el botón de continuar
    fireEvent.click(boton);

    // Verifica que console.log se haya llamado con los valores correctos
    expect(logSpy).toHaveBeenCalledWith("Formulario enviado:", {
        nombre: "Laura",
        visualizacion: "jugador",
    });

    // Limpia el mock después de la prueba
    logSpy.mockRestore();
    });
});
