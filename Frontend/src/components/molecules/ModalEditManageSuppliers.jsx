import React, { useState } from 'react';
import '../styles/molecules/ModalEditManageSuppliers.css';

const ModalEditManageSuppliers = ({ isOpen, onClose }) => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [providerOpen, setProviderOpen] = useState(false);

    const toggleCategory = () => {
        setCategoryOpen(!categoryOpen);
    };

    const toggleProvider = () => {
        setProviderOpen(!providerOpen);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-edit-manage-suppliers-overlay">
            <div className="modal-edit-manage-suppliers-container">
                <div className="modal-edit-manage-suppliers-header">
                    <h2>Editar</h2>
                    <button className="modal-edit-manage-suppliers-close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-edit-manage-suppliers-body">
                    <form className="modal-edit-manage-suppliers-form-container">
                        <div className="modal-edit-manage-suppliers-upper">
                            <div className="modal-edit-manage-suppliers-image-upload">
                                <div className="modal-edit-manage-suppliers-image-placeholder">
                                    <i className="fas fa-plus"></i>
                                </div>
                            </div>
                            <div className="modal-edit-manage-suppliers-form-fields">
                                <div className="modal-edit-manage-suppliers-input-container">
                                    <label className="modal-edit-manage-suppliers-label-name">Nombre</label>
                                    <input type="text" className="modal-edit-manage-suppliers-input modal-edit-manage-suppliers-nombre-input" />
                                </div>
                                <div className="modal-edit-manage-suppliers-form-fields-row">
                                    <div className="modal-edit-manage-suppliers-input-container">
                                        <label className="modal-edit-manage-suppliers-label-name">Cantidad</label>
                                        <input type="text" className="modal-edit-manage-suppliers-input modal-edit-manage-suppliers-cantidad-input" />
                                    </div>
                                    <div className="modal-edit-manage-suppliers-input-container">
                                        <label className="modal-edit-manage-suppliers-label-name">Precio</label>
                                        <input type="text" className="modal-edit-manage-suppliers-input modal-edit-manage-suppliers-precio-input" />
                                    </div>
                                </div>
                                <div className="modal-edit-manage-suppliers-input-container">
                                    <label className="modal-edit-manage-suppliers-label-name">Categoría</label>
                                    <div className="modal-edit-manage-suppliers-select-container">
                                        <input type="text" className="modal-edit-manage-suppliers-input modal-edit-manage-suppliers-categoria-input" />
                                        <button type="button" className="modal-edit-manage-suppliers-select-icon" onClick={toggleCategory}>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </button>
                                    </div>
                                    {categoryOpen && (
                                        <ul className="modal-edit-manage-suppliers-dropdown">
                                            <li>Categoría 1</li>
                                            <li>Categoría 2</li>
                                            <li>Categoría 3</li>
                                        </ul>
                                    )}
                                </div>
                                <div className="modal-edit-manage-suppliers-input-container">
                                    <label className="modal-edit-manage-suppliers-label-name">Proveedor</label>
                                    <div className="modal-edit-manage-suppliers-select-container">
                                        <input type="text" className="modal-edit-manage-suppliers-input modal-edit-manage-suppliers-proveedor-input" />
                                        <button type="button" className="modal-edit-manage-suppliers-select-icon" onClick={toggleProvider}>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </button>
                                    </div>
                                    {providerOpen && (
                                        <ul className="modal-edit-manage-suppliers-dropdown">
                                            <li>Proveedor 1</li>
                                            <li>Proveedor 2</li>
                                            <li>Proveedor 3</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <textarea className="modal-edit-manage-suppliers-descripcion-input" placeholder="Escribe una pequeña descripción..."></textarea>
                        <button className="modal-edit-manage-suppliers-submit-btn-save">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEditManageSuppliers;
