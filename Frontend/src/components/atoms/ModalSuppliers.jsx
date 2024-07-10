import React from 'react';
import '../styles/ModalSuppliers.css';

const ModalSuppliers = ({ isOpen, onClose, children, titulo }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2> {titulo} </h2>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalSuppliers;
