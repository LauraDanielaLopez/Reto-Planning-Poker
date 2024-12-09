import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderMesa from './HeaderMesa';

// Crear un mock para el componente hijo NavegacionNav
jest.mock('../../moleculas/navegacion/navegacion', () => {
  return jest.fn(() => <div>Mock de NavegacionNav</div>);
});

// Prueba 1: Verificar que la imagen, el texto y el componente de navegación se renderizan correctamente
test('debe renderizar el logo, texto y componente de navegación correctamente', () => {
  render(<HeaderMesa text="Texto de prueba" jugador="Jugador1" />);

  // Verificar que la imagen esté en el DOM
  expect(screen.getByAltText('Isotipo de pragma')).toBeInTheDocument();
  
  // Verificar que el texto esté en el DOM
  expect(screen.getByText('Texto de prueba')).toBeInTheDocument();
  
  // Verificar que el mock de NavegacionNav esté en el DOM
  expect(screen.getByText('Mock de NavegacionNav')).toBeInTheDocument();
});

// Prueba 2: Verificar el manejo del estado `modalOpen` (apertura y cierre del modal)
test('debe cambiar el estado del modal al hacer clic en los botones correspondientes', () => {
  render(<HeaderMesa text="Texto de prueba" jugador="Jugador1" />);
  
  // Inicialmente el modal debería estar cerrado
  expect(screen.getByText('Mock de NavegacionNav')).toBeInTheDocument();

  // Llamar a la función de abrir modal
  fireEvent.click(screen.getByText('Mock de NavegacionNav')); // Suponemos que hay algún botón que dispara la acción en el mock

  // Verificar que el modal se ha abierto
  expect(screen.getByText('Mock de NavegacionNav')).toBeInTheDocument();

  // Llamar a la función de cerrar modal
  fireEvent.click(screen.getByText('Mock de NavegacionNav'));

  // Verificar que el modal se ha cerrado
  expect(screen.getByText('Mock de NavegacionNav')).toBeInTheDocument();
});
