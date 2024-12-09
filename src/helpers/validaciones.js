export const validarCrearPartida = (name) => {
  // Regex para permitir letras, números y espacios
  const regex = /^(?!\d+$)[a-zA-Z0-9 ]{5,20}$/;
  const digitCount = (name.match(/\d/g) || []).length;
  return regex.test(name) && digitCount <= 3;
};

export const validarNombre = (nombre) => {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]{5,20}$/; // Ahora incluye el espacio en la validación
  const numeros = nombre.replace(/[^0-9]/g, "").length;
  return regex.test(nombre) && numeros <= 3;
};

// Función para capitalizar la primera letra
export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  // Si la cadena comienza con un espacio, se asegura de que solo se capitalice la primera letra no espacial.
  return string.charAt(0) === ' ' ? ' ' + string.charAt(1).toUpperCase() + string.slice(2).toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

