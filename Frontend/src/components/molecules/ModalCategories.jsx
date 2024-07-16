//Esta es la modal para agregar una categoria
import React from 'react';
import '../styles/molecules/ModalCategories.css';

const ModalCategories = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-categories-overlay">
            <div className="modal-categories-container">
                <div className="modal-categories-header">
                    <h2>Agregar Categoría</h2>
                    <button className="modal-categories-close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-categories-body">
                    <form className="modal-categories-form-container">
                        <div className="modal-categories-form-fields">
                            <div className="modal-categories-form-fields-row">
                                <div className="modal-categories-input-container">
                                    <label className="modal-categories-label-id">Id</label>
                                    <input type="text" className="modal-categories-input modal-categories-id-input" />
                                </div>
                            </div>
                            <div className="modal-categories-form-fields-row">
                                <div className="modal-categories-input-container">
                                    <label className="modal-categories-label-name">Categorías</label>
                                    <input type="text" className="modal-categories-input modal-categories-name-input" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-categories-footer">
                    <button className="modal-categories-submit-btn-add">Agregar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalCategories;
