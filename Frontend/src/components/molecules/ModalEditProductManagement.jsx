import React, { useState } from 'react';
import '../styles/molecules/ModalEditProductManagement.css';

const ModalEditProductManagement = ({ isOpen, onClose }) => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [providerOpen, setProviderOpen] = useState(false);

    const toggleCategory = () => setCategoryOpen(!categoryOpen);
    const toggleProvider = () => setProviderOpen(!providerOpen);

    if (!isOpen) return null;

    return (
        <div className="modal-edit-product-management-overlay">
            <div className="modal-edit-product-management-container">
                <div className="modal-edit-product-management-header">
                    <h2>Editar</h2>
                    <button className="modal-edit-product-management-close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-edit-product-management-body">
                    <form className="modal-edit-product-management-form-container">
                        <div className="modal-edit-product-management-upper">
                            <div className="modal-edit-product-management-image-upload">
                                <div className="modal-edit-product-management-image-placeholder">
                                    <i className="fas fa-plus"></i>
                                </div>
                            </div>
                            <div className="modal-edit-product-management-form-fields">
                                <div className="modal-edit-product-management-input-container">
                                    <label className="modal-edit-product-management-label">Nombre</label>
                                    <input type="text" className="modal-edit-product-management-input modal-edit-product-management-nombre-input" />
                                </div>
                                <div className="modal-edit-product-management-form-fields-row">
                                    <div className="modal-edit-product-management-input-container">
                                        <label className="modal-edit-product-management-label">Cantidad</label>
                                        <input type="text" className="modal-edit-product-management-input modal-edit-product-management-cantidad-input" />
                                    </div>
                                    <div className="modal-edit-product-management-input-container">
                                        <label className="modal-edit-product-management-label">Precio</label>
                                        <input type="text" className="modal-edit-product-management-input modal-edit-product-management-precio-input" />
                                    </div>
                                </div>
                                <div className="modal-edit-product-management-input-container">
                                    <label className="modal-edit-product-management-label">Categoría</label>
                                    <div className="modal-edit-product-management-select-container">
                                        <input type="text" className="modal-edit-product-management-input" />
                                        <button type="button" className="modal-edit-product-management-select-icon" onClick={toggleCategory}>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </button>
                                    </div>
                                    {categoryOpen && (
                                        <ul className="modal-edit-product-management-dropdown">
                                            <li>Categoría 1</li>
                                            <li>Categoría 2</li>
                                            <li>Categoría 3</li>
                                        </ul>
                                    )}
                                </div>
                                <div className="modal-edit-product-management-input-container">
                                    <label className="modal-edit-product-management-label">Proveedor</label>
                                    <div className="modal-edit-product-management-select-container">
                                        <input type="text" className="modal-edit-product-management-input" />
                                        <button type="button" className="modal-edit-product-management-select-icon" onClick={toggleProvider}>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </button>
                                    </div>
                                    {providerOpen && (
                                        <ul className="modal-edit-product-management-dropdown">
                                            <li>Proveedor 1</li>
                                            <li>Proveedor 2</li>
                                            <li>Proveedor 3</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <textarea className="modal-edit-product-management-description-input" placeholder="Escribe una pequeña descripción..."></textarea>
                        <button className="modal-edit-product-management-submit-btn">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEditProductManagement;
