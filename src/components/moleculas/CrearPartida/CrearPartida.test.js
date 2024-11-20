import { render, screen, fireEvent } from '@testing-library/react';
import CrearPartida from './CrearPartida.jsx';

test('El botón Crear partida se habilita con un nombre válido', () => {
  render(<CrearPartida />);

  const input = screen.getByRole('textbox');  
  const button = screen.getByRole('button', { name: 'Crear partida' });

  expect(button).toBeDisabled();


  fireEvent.change(input, { target: { value: 'Partidass123' } });
  expect(button).toBeEnabled();


  fireEvent.change(input, { target: { value: '12356' } });
  expect(button).toBeDisabled();  
});

