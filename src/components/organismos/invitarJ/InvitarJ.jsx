import React from 'react';
import './InvitarJ.css';
import Input from '../../atomos/Input/Input';
import ButtonBlanco from '../../atomos/Buttons/ButtonBlanco/ButtonBlanco';

const InvitarJ = ({ text, value, onChange }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
      .then(() => alert('¡Link copiado!'))
      .catch(err => console.error('Error al copiar:', err));
  };

  return (
    <section>
      <article className='invitarJ'>
        <p className='invitarJ__text'>{text}</p>
        <div className='invitarJ__content'>
            <Input name="invitar" id="invitar" value={value} onChange={onChange} />
            <ButtonBlanco text="Copiar Link" type="button" onClick={handleCopy} />
        </div>
        
      </article>
    </section>
  );
};

export default InvitarJ;
