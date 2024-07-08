import React from 'react';
import '../styles/styles.css';

// eslint-disable-next-line react/prop-types
const Button = ({ label, onClick, className }) => (
    <button className={className} onClick={onClick}>
        {label}
    </button>
);

export default Button;
