import React from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.css';

const Icon = ({ name }) => {
    return <i className={`fas fa-${name}`}></i>;
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Icon;
