import React, { useState } from 'react';
import '../styles/molecules/ModalProductManagement.css';

const ModalProductManagement = ({ isOpen, onClose }) => {
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
        <div className="modal-product-management-overlay">
            <div className="modal-product-management-container">
                <div className="modal-product-management-header">
                    <h2>Agregar producto</h2>
                    <button className="modal-product-management-close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-product-management-body">
                    <form className="modal-product-management-form-container">
                        <div className="modal-product-management-upper">
                            <div className="modal-product-management-image-upload">
                                <div className="modal-product-management-image-placeholder">
                                    <i className="fas fa-plus"></i>
                                </div>
                            </div>
                            <div className="modal-product-management-form-fields">
                                <div className="modal-product-management-input-container">
                                    <label className="modal-product-management-label-name">Nombre</label>
                                    <input type="text" className="modal-product-management-input modal-product-management-nombre-input" />
                                </div>
                                <div className="modal-product-management-form-fields-row">
                                    <div className="modal-product-management-input-container">
                                        <label className="modal-product-management-label-name">Cantidad</label>
                                        <input type="text" className="modal-product-management-input modal-product-management-cantidad-input" />
                                    </div>
                                    <div className="modal-product-management-input-container">
                                        <label className="modal-product-management-label-name">Precio</label>
                                        <input type="text" className="modal-product-management-input modal-product-management-precio-input" />
                                    </div>
                                </div>
                                <div className="modal-product-management-input-container">
                                    <label className="modal-product-management-label-name">Categoría</label>
                                    <div className="modal-product-management-select-container">
                                        <input type="text" className="modal-product-management-input modal-product-management-categoria-input" />
                                        <button type="button" className="modal-product-management-select-icon" onClick={toggleCategory}>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </button>
                                    </div>
                                    {categoryOpen && (
                                        <ul className="modal-product-management-dropdown">
                                            <li>Categoría 1</li>
                                            <li>Categoría 2</li>
                                            <li>Categoría 3</li>
                                        </ul>
                                    )}
                                </div>
                                <div className="modal-product-management-input-container">
                                    <label className="modal-product-management-label-name">Proveedor</label>
                                    <div className="modal-product-management-select-container">
                                        <input type="text" className="modal-product-management-input modal-product-management-proveedor-input" />
                                        <button type="button" className="modal-product-management-select-icon" onClick={toggleProvider}>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </button>
                                    </div>
                                    {providerOpen && (
                                        <ul className="modal-product-management-dropdown">
                                            <li>Proveedor 1</li>
                                            <li>Proveedor 2</li>
                                            <li>Proveedor 3</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <textarea className="modal-product-management-descripcion-input" placeholder="Escribe una pequeña descripción..."></textarea>
                        <button className="modal-product-management-submit-btn-add">Agregar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalProductManagement;
