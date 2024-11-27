import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonUsuario from "./usuario";
import "@testing-library/jest-dom";

describe("ButtonUsuario", () => {
  test("Debe renderizar correctamente con el texto proporcionado", () => {
    render(<ButtonUsuario text="AB" />);
    const textElement = screen.getByText("AB");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("buttonUsuario__text");
  });

  test("Debe mostrar texto vacío si no se proporciona texto", () => {
    render(<ButtonUsuario text="" />);
    const textElement = screen.getByText("");
    expect(textElement).toBeInTheDocument();
  });

  test("Debe manejar correctamente un texto largo", () => {
    const longText = "TextoLargoDePrueba";
    render(<ButtonUsuario text={longText} />);
    const textElement = screen.getByText(longText);
    expect(textElement).toBeInTheDocument();
  });
});
