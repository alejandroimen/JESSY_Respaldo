//Esto es la modal de Categorias poder editar

import React from 'react';
import '../styles/molecules/ModalEditManageCategories.css';

const ModalEditManageCategories = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-edit-manage-categorie-overlay">
            <div className="modal-edit-manage-categorie-container">
                <div className="modal-edit-manage-categorie-header">
                    <h2>Editar Categoria</h2>
                    <button className="modal-edit-manage-categorie-close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-edit-manage-categorie-body">
                    <form className="modal-edit-manage-categorie-form-container">
                        <div className="modal-edit-manage-categorie-form-fields">
                            <div className="modal-edit-manage-categorie-form-fields-row">
                                <div className="modal-edit-manage-categorie-input-container">
                                    <label className="modal-edit-manage-categorie-label-id">Id</label>
                                    <input type="text" className="modal-edit-manage-categorie-input modal-edit-manage-categorie-id-input" />
                                </div>
                            </div>
                            <div className="modal-edit-manage-categorie-form-fields-row">
                                <div className="modal-edit-manage-categorie-input-container">
                                    <label className="modal-edit-manage-categorie-label-name">Categoria</label>
                                    <input type="text" className="modal-edit-manage-categorie-input modal-edit-manage-categorie-name-input" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-edit-manage-categorie-footer">
                    <button className="modal-edit-manage-categorie-submit-btn-add">Agregar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditManageCategories;
