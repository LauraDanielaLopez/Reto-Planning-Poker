//importamos la constaante
import { URL } from "../helpers/config.js"
//resibe como parametro el endpoint

export const obtenerDatos = async (endpoint) => {
    try {
        const response = await fetch(`${URL}/${endpoint}`);
        return response.json();
        ///retorna una promesa
      } catch (error) {
        console.error(`Error al obtener datos de ${endpoint}:`, error);
      }
    
}
export const envia = async (endpoint, data) => {
    try {
        const response = await fetch(`${URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            return null;
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        } else {
            console.error("Respuesta no es JSON:", await response.text());
            return null;
        }
    } catch (error) {
        console.error(`Error al enviar datos a ${endpoint}:`, error);
    }
};

// Función para actualizar la carta seleccionada
export const actualizarCartaSeleccionada = async (endpoint, cartaSeleccionada) => {
    try {
        // Obtener los datos completos del usuario antes de actualizar
        const usuario = await obtenerDatos(`usuarios/${endpoint}`);  // endpoint debería ser el id del usuario
        
        // Actualizar solo la cartaSeleccionada
        const updatedUsuario = { ...usuario, cartaSeleccionada };

        // Enviar los datos completos del usuario con la carta seleccionada actualizada
        const response = await fetch(`${URL}/usuarios/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUsuario), // Enviamos los datos completos con la carta seleccionada actualizada
        });
        const data = await response.json();
        console.log("Carta seleccionada actualizada:", data); // Log de la respuesta del backend
    } catch (error) {
        console.error("Error al actualizar la carta seleccionada:", error);
    }
};

// Función AJAX para actualizar el estado revelado, manteniendo los demás datos de la partida
export const actualizarRevelado = async (idPartida, estadoRevelado) => {
    try {
        // Primero obtenemos los datos completos de la partida
        const partida = await obtenerDatos(`partidas/${idPartida}`);
        
        // Solo actualizamos el campo revelado, manteniendo el resto de los datos de la partida
        const partidaActualizada = { ...partida, revelado: estadoRevelado };

        const response = await fetch(`${URL}/partidas/${idPartida}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(partidaActualizada),
        });

        if (!response.ok) {
            console.error("Error en la actualización de estado revelado:", response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        return data; // Retorna la respuesta en formato JSON
    } catch (error) {
        console.error("Error al actualizar el estado revelado:", error);
    }
};

export const actualizarModoPuntaje = async (partidaId, nuevoModo) => {
    try {
      const response = await fetch(`${URL}/partidas/${partidaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modoPuntaje: nuevoModo.nombre,
        }),
      });
      return response.json();
    } catch (error) {
      console.error("Error al actualizar el modo de puntaje:", error);
    }
  };
