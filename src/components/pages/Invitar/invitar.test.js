import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Invitar from "./Invitar";
import "@testing-library/jest-dom";
import { useNavigate } from "react-router-dom";
import { obtenerDatos } from "../../../services/ajax";

// Mock de la función obtenerDatos desde el archivo ajax.js
jest.mock('../../../services/ajax', () => ({
  obtenerDatos: jest.fn(),
}));

// Mock de useNavigate para comprobar la navegación
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Invitar Componente', () => {
  
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba para evitar efectos entre pruebas
    jest.clearAllMocks();
  });

  it('renderiza InvitarJ con los accesorios correctos y el valor del enlace inicial', async () => {
    // Simulando que obtenerDatos devuelve una lista de partidas con una partida activa
    obtenerDatos.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    render(<Invitar />);

    // Esperar a que se haya generado el link después de la llamada asíncrona
    await waitFor(() => expect(obtenerDatos).toHaveBeenCalled());

    // Verificar que el texto "Invita a un jugador" se renderiza correctamente
    const textElement = screen.getByText('Invita a un jugador');
    expect(textElement).toBeInTheDocument();

    // Verificar que el input tiene el valor generado (el link)
    const inputElement = screen.getByTestId('mock-input');
    expect(inputElement).toHaveValue(`${window.location.origin}/crearAdmin?partidaId=2`);
  });

  it('actualiza el estado del enlace cuando cambia la entrada', async () => {
    // Simulando que obtenerDatos devuelve una lista de partidas con una partida activa
    obtenerDatos.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    render(<Invitar />);

    // Esperar a que el link se haya generado
    await waitFor(() => expect(obtenerDatos).toHaveBeenCalled());

    const inputElement = screen.getByTestId('mock-input');

    // Simular cambio en el input
    fireEvent.change(inputElement, { target: { value: 'https://new-link.com' } });

    // Verificar que el estado y el input se actualizan correctamente
    expect(inputElement).toHaveValue('https://new-link.com');
  });

  it('navega correctamente cuando se llama a handleJoin', () => {
    const navigate = useNavigate();
    render(<Invitar />);

    // Simulando el click que debería disparar la navegación
    fireEvent.click(screen.getByText('Invita a un jugador'));

    // Verificar que la navegación se ejecuta con los parámetros correctos
    expect(navigate).toHaveBeenCalledWith("/visualizarInvitado", {
      state: { partidaId: 123, jugadorId: 456, tipo: "invitado" }
    });
  });

});
