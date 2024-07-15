import React from 'react';
import '../styles/molecules/DeleteModal.css';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-delete-overlay">
            <div className="modal-delete-container">
                <div className="modal-delete-body">
                    <p>¿Realmente quiere eliminar este proveedor?</p>
                </div>
                <div className="modal-delete-footer">
                    <button className="modal-delete-cancel-btn" onClick={onClose}>No</button>
                    <button className="modal-delete-delete-btn" onClick={onDelete}>Si</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;