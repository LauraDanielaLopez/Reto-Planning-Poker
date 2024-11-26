import React from 'react';
import './LayoutCenter.css';

const LayoutCenter = ({ children, className = '' }) => {
  return <div className={`centered__layout ${className}`}>{children}</div>;
};

export default LayoutCenter;