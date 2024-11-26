import React from 'react';
import './PlayerTable.css';

const Circle = ({ name, isCenter }) => (
  <main className='circle'>
    <section className={`circle__grande ${isCenter }`}>
      {name}
      <article className='circle__mediano'>
        <div className='circle__pequeno'></div>
      </article>
    </section>
  </main>
  
);

export default Circle;
