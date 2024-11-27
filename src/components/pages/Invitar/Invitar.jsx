import React, { useState } from 'react';
import InvitarJ from '../../organismos/invitarJ/InvitarJ';

const Invitar = () => {
  const [link, setLink] = useState("https://example.com/invitation");

  return (
    <div className='contenedor'>
      <InvitarJ 
        text="Invita a un jugador"
        value={link} 
        onChange={(e) => setLink(e.target.value)}
      />
    </div>
  );
};

export default Invitar;
