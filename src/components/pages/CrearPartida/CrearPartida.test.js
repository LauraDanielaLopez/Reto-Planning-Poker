import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CrearPartida from './CrearPartida.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { envia } from '../../../services/ajax.js';

// Mock de la función 'envia'
jest.mock('../../../services/ajax.js', () => ({
  envia: jest.fn(),
}));

// Mock de la función de validación
jest.mock('../../../helpers/validaciones.js', () => ({
  validarCrearPartida: jest.fn(),
}));

describe('CrearPartida', () => {

  // Prueba 1: Verifica que el botón "Crear partida" se habilite con un nombre válido
  test('Botón de Crear partida se habilita con un nombre válido', () => {
    render(
      <Router>
        <CrearPartida />
      </Router>
    );
  
    const input = screen.getByRole('textbox');  
    const button = screen.getByRole('button', { name: 'Crear partida' });
  
    // Mock de la función de validación
    require('../../../helpers/validaciones.js').validarCrearPartida.mockReturnValue(true);  // Agregar este mock aquí
  
    // Inicialmente, el botón debe estar deshabilitado
    expect(button).toBeDisabled();
  
    // Ingresamos un nombre válido
    fireEvent.change(input, { target: { value: 'PartidaValida123' } });
    expect(button).toBeEnabled();
  
    // Ingresamos un nombre inválido
    fireEvent.change(input, { target: { value: '12345' } });
    expect(button).toBeDisabled();
  });
  

  // Prueba 2: Verifica que se renderiza correctamente sin errores
  test('Debe renderizar sin errores', () => {
    render(
      <Router>
        <CrearPartida />
      </Router>
    );

    // Verificar si los elementos clave están presentes
    expect(screen.getByLabelText(/Nombra la partida/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Crear partida' })).toBeInTheDocument();
  });

  // Prueba 3: Verificar que el formulario se envíe correctamente cuando es válido
  test('Debe enviar el formulario con un nombre válido y redirigir', async () => {
    render(
      <Router>
        <CrearPartida />
      </Router>
    );

    // Mock para que la validación siempre devuelva true
    require('../../../helpers/validaciones.js').validarCrearPartida.mockReturnValue(true);

    // Ingresamos un nombre válido
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Crear partida' });
    fireEvent.change(input, { target: { value: 'PartidaValida123' } });

    // Simulamos la respuesta de la API
    envia.mockResolvedValue({ id: '123', nombre: 'PartidaValida123' });

    fireEvent.click(button);

    // Verificamos que la función `envia` fue llamada correctamente
    await waitFor(() => expect(envia).toHaveBeenCalledWith('partidas', { nombre: 'PartidaValida123' }));

    // Verificamos que la redirección se produce después de la creación
    expect(window.location.href).toBe('http://localhost/crearAdmin');
  });

  // Prueba 4: Verificar que no se crea la partida si la validación falla
  test('No debe crear la partida si el nombre es inválido', async () => {
    render(
      <Router>
        <CrearPartida />
      </Router>
    );
  
    // Mock para que la validación siempre devuelva false
    require('../../../helpers/validaciones.js').validarCrearPartida.mockReturnValue(false);
  
    // Ingresamos un nombre inválido
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Crear partida' });
    fireEvent.change(input, { target: { value: '1234' } });
  
    // Hacemos clic en el botón
    fireEvent.click(button);
  
    // Verificamos que la función `envia` no se haya llamado
    await waitFor(() => expect(envia).not.toHaveBeenCalled());
  });
  

  // Prueba 5: Verificar el manejo de errores si la API falla
  test('Debe manejar errores al crear la partida', async () => {
    render(
      <Router>
        <CrearPartida />
      </Router>
    );
  
    // Mock para que la validación siempre devuelva true
    require('../../../helpers/validaciones.js').validarCrearPartida.mockReturnValue(true);
  
    // Ingresamos un nombre válido
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Crear partida' });
    fireEvent.change(input, { target: { value: 'PartidaValida123' } });
  
    // Simulamos un error en la API
    envia.mockRejectedValue(new Error('Error al crear la partida'));
  
    // Espiar console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  
    // Hacemos clic en el botón
    fireEvent.click(button);
  
    // Verificamos que se muestra un error en la consola
    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith('Error a crear partida: ', expect.any(Error)));
  
    // Restaurar el espía
    consoleSpy.mockRestore();
  });
  
});
