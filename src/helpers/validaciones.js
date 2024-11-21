export const validarCrearPartida = (name) => {
  // Regex para permitir letras, números y espacios
  const regex = /^(?!\d+$)[a-zA-Z0-9 ]{5,20}$/;
  const digitCount = (name.match(/\d/g) || []).length;
  return regex.test(name) && digitCount <= 3;
};

export const validarNombre = (nombre) => {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,20}$/;
  const numeros = nombre.replace(/[^0-9]/g, "").length;
  return regex.test(nombre) && numeros <= 3;
};
