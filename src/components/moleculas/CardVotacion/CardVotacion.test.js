import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardVotacion from './CardVotacion';

// Prueba 1: Verificar que el texto "Elige una carta 👇" se renderiza correctamente.
test('debe renderizar el texto "Elige una carta 👇"', () => {
  render(<CardVotacion onCartaSeleccionada={() => {}} />);

  // Verificar que el texto esté presente en el DOM.
  expect(screen.getByText(/Elige una carta 👇/)).toBeInTheDocument();
});

// Prueba 2: Verificar que los valores de las cartas se renderizan correctamente.
test('debe renderizar todas las cartas con sus valores', () => {
  render(<CardVotacion onCartaSeleccionada={() => {}} />);

  const valoresCartas = ["0", "1", "3", "5", "8", "13", "21", "34", "55", "89", "?", "☕"];
  
  // Verificar que cada valor esté en el DOM.
  valoresCartas.forEach((valor) => {
    expect(screen.getByText(valor)).toBeInTheDocument();
  });
});

// Prueba 3: Verificar que la función `onCartaSeleccionada` se llama con el valor correcto cuando se hace clic en una carta.
test('debe llamar a onCartaSeleccionada con el valor correcto cuando se hace clic en una carta', () => {
  const mockOnCartaSeleccionada = jest.fn(); // Crear una función mock para espiar

  render(<CardVotacion onCartaSeleccionada={mockOnCartaSeleccionada} />);

  // Hacer clic en la carta con valor "13"
  fireEvent.click(screen.getByText('13'));

  // Verificar que la función mock se llamó con el valor correcto
  expect(mockOnCartaSeleccionada).toHaveBeenCalledWith('13');
  expect(mockOnCartaSeleccionada).toHaveBeenCalledTimes(1); // Verificar que se haya llamado una vez
});
