import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CrearPartida from './CrearPartida.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

test('Botón de Crear partida se habilita con un nombre válido', () => {
  render(
    <Router>
      <CrearPartida />
    </Router>
  );

  // campo de entrada
  const input = screen.getByRole('textbox');  
  const button = screen.getByRole('button', { name: 'Crear partida' });

  // verificamos el resultado
  expect(button).toBeDisabled();

  fireEvent.change(input, { target: { value: 'Partidass123' } });
  expect(button).toBeEnabled();

  fireEvent.change(input, { target: { value: '12356' } });
  expect(button).toBeDisabled();  
});

test('debe renderizar sin errores', () => {
  render(
    <Router>
      <CrearPartida />
    </Router>
  );
});
