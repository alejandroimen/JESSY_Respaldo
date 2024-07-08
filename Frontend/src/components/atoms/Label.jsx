import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ text }) => <label>{text}</label>;

Label.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Label;
