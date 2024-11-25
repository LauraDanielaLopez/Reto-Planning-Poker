import React from 'react';
import './CirclePlayer.css';

const Circle = ({ name, isCenter }) => (
  <div className='mesa'>
    <div className={`circle ${isCenter ? 'circle--center' : ''}`}>
    {name}
    <div className='circle__mediano'>
      <div className='circle__pequeno'></div>
    </div>
  </div>
  </div>
  
);

export default Circle;
