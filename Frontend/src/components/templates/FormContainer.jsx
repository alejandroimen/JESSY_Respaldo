import React from 'react';
import Icon from '../atoms/Icon';
import '../styles/organisms/styles.css';

const FormContainer = ({ icon, children }) => (
    <div className="form-container">
        <div className="form-header">
            {icon && <div className="icon-circle"><Icon name={icon} /></div>}
        </div>
        {children}
    </div>
);

export default FormContainer;