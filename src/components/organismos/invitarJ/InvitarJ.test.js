import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InvitarJ from './InvitarJ';

// Mock de la API Clipboard para evitar el acceso real al portapapeles
beforeAll(() => {
  global.navigator.clipboard = {
    writeText: jest.fn().mockResolvedValue(true),
  };
});

test('debe renderizar el texto correctamente', () => {
  render(<InvitarJ text="Texto de invitación" value="" onChange={() => {}} />);
  
  // Verificar que el texto que se pasa como prop 'text' esté en el documento
  expect(screen.getByText('Texto de invitación')).toBeInTheDocument();
});

test('debe mostrar el valor en el input', () => {
  render(<InvitarJ text="Texto de invitación" value="http://link.com" onChange={() => {}} />);
  
  // Verificar que el valor del input coincida con el valor pasado como prop
  expect(screen.getByDisplayValue('http://link.com')).toBeInTheDocument();
});

test('debe llamar a la función handleCopy cuando se hace clic en el botón', async () => {
  render(<InvitarJ text="Texto de invitación" value="http://link.com" onChange={() => {}} />);
  
  // Simulamos el clic en el botón
  fireEvent.click(screen.getByText('Copiar Link'));

  // Verificar que navigator.clipboard.writeText se haya llamado con el valor correcto
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://link.com');
});

test('debe mostrar alerta cuando el link se copia correctamente', async () => {
  // Crear un mock para alert
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
  render(<InvitarJ text="Texto de invitación" value="http://link.com" onChange={() => {}} />);
  
  // Simulamos el clic en el botón
  fireEvent.click(screen.getByText('Copiar Link'));

  // Verificar que la alerta se haya mostrado
  expect(alertMock).toHaveBeenCalledWith('¡Link copiado!');
  
  // Restaurar el mock de la alerta después de la prueba
  alertMock.mockRestore();
});

test('debe no hacer nada si hay un error al copiar el link', async () => {
  // Cambiar el comportamiento del mock para simular un error
  navigator.clipboard.writeText.mockRejectedValue(new Error('Error al copiar'));
  
  render(<InvitarJ text="Texto de invitación" value="http://link.com" onChange={() => {}} />);
  
  // Simulamos el clic en el botón
  fireEvent.click(screen.getByText('Copiar Link'));
  
  // Verificar que no se muestra alerta
  expect(window.alert).not.toHaveBeenCalled();
});
