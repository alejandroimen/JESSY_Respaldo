import React from 'react';
import '../styles/molecules/LogoutModal.css';

const ModalLogout = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-logout-overlay">
            <div className="modal-logout-container">
                <div className="modal-logout-body">
                    <p>¿Realmente quiere cerrar sesión?</p>
                </div>
                <div className="modal-logout-footer">
                    <button className="modal-logout-cancel-btn" onClick={onClose}>No</button>
                    <button className="modal-logout-confirm-btn" onClick={onLogout}>Sí</button>
                </div>
            </div>
        </div>
    );
};

export default ModalLogout;