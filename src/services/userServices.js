import {URL} from '../helpers/config';
import {envia} from '../helpers/ajax';

export const obtenerUsuarios = async () => {
  return await fetch(`${URL}/usuarios`).then((res) => res.json());
};

export const agregarUsuario = async (usuario) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  }
  return await envia('usuarios', options);
}

export const agregarPartida = async (partida) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partida),
  };
  return await envia('partidas', options);
};
