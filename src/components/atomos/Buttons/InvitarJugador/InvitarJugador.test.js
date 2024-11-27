import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import InvitarJugador from "./InvitarJugador";
import "@testing-library/jest-dom";

describe("InvitarJugador", () => {
    test("Se debe renderizar correctamente con texto y tipo predeterminado", () => {
        render(<InvitarJugador text="Invitar" />);
        const button = screen.getAllByRole("button", {name: /Invitar/i});
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "button");
    })

    test("se debe aceptar un texto y renderizarlo correctamente", () =>{
        render(<InvitarJugador text="Invitar" disabled={true} />);
        const button = screen.getAllByRole("button", { name: /Invitar/i });
        expect(button).toBeDisabled();
    })

    test("se debe llamar a la funcion onClick cuando hace clicl", () => {
        const handleClick = jest.fn();
        render(<InvitarJugador text="Invitar" onClick={handleClick} />);
        const button = screen.getByRole("button", { name: /Invitar/i });

        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    })

    test("se debe permitir personalizar el tipo de boton", () => {
        render(<InvitarJugador text="Invitar" type="submit" />);
        const button = screen.getByRole("button", { name: /Invitar/i });
        expect(button).toHaveAttribute("type", "submit");
    })
})


