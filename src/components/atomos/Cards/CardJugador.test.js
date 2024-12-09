import React from 'react';
import { render, screen } from '@testing-library/react';
import CardJugador from './CardJugador';

// Prueba 1: Verificar que el componente renderiza correctamente una carta sin seleccionar.
test('debe renderizar una carta sin seleccionar', () => {
  render(<CardJugador tipo="jugador" cartaSeleccionada={false} nombre="Jugador 1" isSelec={false} />);

  // nombre del jugador está en el documento.
  expect(screen.getByText('Jugador 1')).toBeInTheDocument();

  // la carta tiene la clase 'card__border', indicando que no está seleccionada.
  const card = screen.getByRole('generic'); 
  expect(card).toHaveClass('card__border');
});

// Prueba 2: Verificar la carta con la clase 'carta__seleccionada' cuando cartaSeleccionada es true.
test('debe renderizar una carta seleccionada', () => {
  render(<CardJugador tipo="jugador" cartaSeleccionada={true} nombre="Jugador 2" isSelec={true} />);

  // Verificar que la carta tiene la clase 'carta__seleccionada'.
  const card = screen.getByRole('generic');
  expect(card).toHaveClass('carta__seleccionada');
});

// Prueba 3: Verificar que el nombre del jugador es renderizado correctamente.
test('debe renderizar el nombre del jugador correctamente', () => {
  render(<CardJugador tipo="jugador" cartaSeleccionada={false} nombre="Jugador 3" isSelec={false} />);

  // Verificar que el nombre del jugador está presente en el documento.
  expect(screen.getByText('Jugador 3')).toBeInTheDocument();
});

// Prueba 4: Verificar que no se muestra el valor de cartaSeleccionada dentro de la carta.
test('no debe mostrar el valor de cartaSeleccionada dentro de la carta', () => {
  render(<CardJugador tipo="jugador" cartaSeleccionada={true} nombre="Jugador 4" isSelec={true} />);

  // Verificar que no se muestra el texto de cartaSeleccionada en el div.
  const card = screen.getByRole('generic');
  expect(card).not.toHaveTextContent('cartaSeleccionada');
});
