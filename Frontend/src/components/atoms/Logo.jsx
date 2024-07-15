import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/Logo.png';
import '../styles/atoms/Logo.css'

const Logo = ({ className }) => {
    return (
        <img
            src={logo}
            alt="JESSY Logo"
            className={className}
        />
    );
};

Logo.propTypes = {
    className: PropTypes.string,
};

Logo.defaultProps = {
    className: '',
};

export default Logo;