import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';
import '../styles/organisms/styles.css';

const InputField = ({ id, type, placeholder, iconName, onChange }) => {
    return (
        <div className="input-field">
            {iconName && <Icon name={iconName} />}
            <input id={id} type={type} placeholder={placeholder} onChange={onChange} />
        </div>
    );
};

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    iconName: PropTypes.string,
};

export default InputField;