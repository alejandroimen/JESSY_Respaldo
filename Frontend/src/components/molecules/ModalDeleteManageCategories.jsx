import React from 'react';
import '../styles/molecules/DeleteModal.css';

const ModalDeleteCategory = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-delete-overlay">
            <div className="modal-delete-container">
                <div className="modal-delete-body">
                    <p>¿Realmente quiere eliminar esta categoría?</p>
                </div>
                <div className="modal-delete-footer">
                    <button className="modal-delete-cancel-btn" onClick={onClose}>No</button>
                    <button className="modal-delete-delete-btn" onClick={onDelete}>Sí</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDeleteCategory;
