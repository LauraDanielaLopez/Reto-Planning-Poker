import React, { useEffect, useState } from 'react';
import InvitarJ from '../../organismos/invitarJ/InvitarJ';
import { obtenerDatos } from '../../../services/ajax';
import { useLocation } from "react-router-dom";

const Invitar = () => {
  const location = useLocation();
  console.log("Estado recibido en VisualizarMesa:", location.state);

  const [link, setLink] = useState("");

  useEffect(() => {
    const generar = async () => {
      try {
        const partidas = await obtenerDatos("partidas");
        const partidaActiva = partidas[partidas.length - 1];
        console.log(partidaActiva);
        
        if(partidaActiva?.id){
          const linkGenerado = `${window.location.origin}/crearAdmin?partidaId=${partidaActiva.id}`;
          setLink(linkGenerado)
          console.log(linkGenerado);
        }else{
          console.log("No hay partidas");
          
        }
        
      } catch (error) {
        console.error("Error al generar el link de invitación:", error);
      }
    }
    generar();
  }, []);

  return (
    <div className='contenedor'>
      <InvitarJ 
        text="Invita a un jugador"
        value={link} 
        readOnly
        onChange={(e) => setLink(e.target.value)}
      />
    </div>
  );
};

export default Invitar;
