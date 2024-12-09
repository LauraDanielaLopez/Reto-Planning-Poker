import { validarCrearPartida, validarNombre, capitalizeFirstLetter } from './validaciones';

describe('validarCrearPartida', () => {
  test('Debe devolver true para un nombre válido sin números excesivos', () => {
    const name = 'Partida 123';
    expect(validarCrearPartida(name)).toBe(true);
  });

  test('Debe devolver false para un nombre con más de tres números', () => {
    const name = 'Partida 12345';
    expect(validarCrearPartida(name)).toBe(false);
  });

  test('Debe devolver false para un nombre con solo números', () => {
    const name = '12345';
    expect(validarCrearPartida(name)).toBe(false);
  });

  test('Debe devolver false para un nombre que no cumpla con los requisitos de longitud', () => {
    const name = 'A';
    expect(validarCrearPartida(name)).toBe(false);
  });

  test('Debe devolver false para un nombre con caracteres no permitidos', () => {
    const name = 'Partida@123';
    expect(validarCrearPartida(name)).toBe(false);
  });
});

describe('validarNombre', () => {
  test('Debe devolver true para un nombre válido sin más de tres números', () => {
    const nombre = 'Carlos123';
    expect(validarNombre(nombre)).toBe(true);
  });

  test('Debe devolver false para un nombre con más de tres números', () => {
    const nombre = 'Carlos1234';
    expect(validarNombre(nombre)).toBe(false);
  });

  test('Debe devolver false para un nombre con caracteres no permitidos', () => {
    const nombre = 'Carlos@123';
    expect(validarNombre(nombre)).toBe(false);
  });

  test('Debe devolver false para un nombre con longitud incorrecta', () => {
    const nombre = 'Carlos';
    expect(validarNombre(nombre)).toBe(true); // Este caso es válido
    const nombreCorto = 'C';
    expect(validarNombre(nombreCorto)).toBe(false); // Este caso es inválido
  });

  test('Debe devolver false para un nombre vacío', () => {
    const nombre = '';
    expect(validarNombre(nombre)).toBe(false);
  });
});

describe('capitalizeFirstLetter', () => {
  test('Debe devolver la cadena con la primera letra en mayúscula', () => {
    const input = 'hello';
    expect(capitalizeFirstLetter(input)).toBe('Hello');
  });

  test('Debe devolver la cadena vacía si la entrada es vacía', () => {
    const input = '';
    expect(capitalizeFirstLetter(input)).toBe('');
  });

  test('Debe manejar correctamente las mayúsculas ya presentes', () => {
    const input = 'HELLO';
    expect(capitalizeFirstLetter(input)).toBe('Hello');
  });

  test('Debe manejar las cadenas con espacios', () => {
    const input = ' hELLO';
    expect(capitalizeFirstLetter(input)).toBe(' Hello');
  });
  
});
