//importamos la constaante
import { URL } from "./config.js"
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


