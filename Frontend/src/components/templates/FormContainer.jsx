import React from 'react';
import Icon from '../atoms/Icon';
import '../styles/organisms/styles.css';

const FormContainer = ({ titulo, icon, children }) => (
    <div className="form-container">
        <div className="form-header">
        <h1> {titulo} </h1>
            {icon && <div className="icon-circle"><Icon name={icon} /></div>}
        </div>
        {children}
    </div>
);

export default FormContainer;