import React from 'react';
import { render, screen } from '@testing-library/react';
import Circle from './Circle';

// Prueba 1: Verificar que el componente renderiza el nombre correctamente.
test('debe renderizar el nombre correctamente', () => {
  render(<Circle name="Jugador 1" isCenter={false} />);

  // Verificar que el nombre 'Jugador 1' aparece en el componente.
  expect(screen.getByText('Jugador 1')).toBeInTheDocument();
});

// Prueba 2: Verificar que el componente tiene la clase 'circle__grande' sin la clase 'center' cuando isCenter es false.
test('debe renderizar sin la clase "center" cuando isCenter es false', () => {
  render(<Circle name="Jugador 2" isCenter={false} />);

  const circleGrande = screen.getByRole('generic');
  expect(circleGrande).toHaveClass('circle__grande');
  expect(circleGrande).not.toHaveClass('center');
});

// Prueba 3: Verificar que el componente tiene la clase 'circle__grande' con la clase 'center' cuando isCenter es true.
test('debe renderizar con la clase "center" cuando isCenter es true', () => {
  render(<Circle name="Jugador 3" isCenter={true} />);

  const circleGrande = screen.getByRole('generic');
  expect(circleGrande).toHaveClass('circle__grande');
  expect(circleGrande).toHaveClass('center');
});
