export const validarCrearPartida = (name) => {
    // Regex para permitir letras, números y espacios
    const regex = /^(?!\d+$)[a-zA-Z0-9 ]{5,20}$/;
    const digitCount = (name.match(/\d/g) || []).length;
    return regex.test(name) && digitCount <= 3;
  };