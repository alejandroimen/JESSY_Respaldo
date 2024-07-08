import React from 'react';
import logo from '../../assets/Logo.png';
import '../styles/Logo.css';

const Logo = () => {
    return (
        <img src={logo} alt="JESSY Logo" className="header-logo" />
    );
};

export default Logo;
