import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import Invitar from "./Invitar";
import "@testing-library/jest-dom";

describe('Invitar Component', () => {
    it('renders InvitarJ with the correct props', () => {
      render(<Invitar />);
  
      // Verificar texto del componente InvitarJ
      const textElement = screen.getByText('Invita a un jugador');
      expect(textElement).toBeInTheDocument();
  
      // Verificar que el input tiene el valor inicial
      const inputElement = screen.getByTestId('mock-input');
      expect(inputElement).toHaveValue('https://example.com/invitation');
    });
  
    it('updates the link state when input changes', () => {
      render(<Invitar />);
  
      const inputElement = screen.getByTestId('mock-input');
  
      // Simular cambio en el input
      fireEvent.change(inputElement, { target: { value: 'https://new-link.com' } });
  
      // Verificar que el estado y el input se actualizan
      expect(inputElement).toHaveValue('https://new-link.com');
    });
  });