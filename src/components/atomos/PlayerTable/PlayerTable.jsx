import React from 'react';
import './PlayerTable.css';

const Circle = ({ name, isCenter, children }) => (
  <main className='circle'>
    <section className={`circle__grande ${isCenter }`}>
      {name}
      <article className='circle__mediano'>
        <div className='circle__pequeno'>
        {children}
        </div>
      </article>
    </section>
  </main>
  
);

export default Circle;
