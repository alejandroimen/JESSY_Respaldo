import React, { useState } from 'react';
import '../styles/molecules/ModalEditProductManagement.css';

const ModalEditProductManagement = ({ isOpen, onClose, categories, providers, setCategory_id, setProvider_id }) => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [providerOpen, setProviderOpen] = useState(false);

    const toggleCategory = () => setCategoryOpen(!categoryOpen);
    const toggleProvider = () => setProviderOpen(!providerOpen);

    const handleSelectCategory = (category) => {
        setCategory_id(category.id_Categorias);
        toggleCategory();
    };

    const handleSelectProvider = (provider) => {
        setProvider_id(provider.id_proveedor);
        toggleProvider();
    };

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
                                        <select type="text" className="modal-edit-product-management-input" >
                                        {(
                                            categories.map(category => (
                                                <option key={category.id_Categorias} onClick={() => handleSelectCategory(category)}>
                                                    {category.nombreCategoria}
                                                </option>
                                                
                                            ))
                                    )} 
                                        </select>
                                        
                                    </div>
                                </div>
                                <div className="modal-edit-product-management-input-container">
                                    <label className="modal-edit-product-management-label">Proveedor</label>
                                    <div className="modal-edit-product-management-select-container">
                                        <select type="text" className="modal-edit-product-management-input" >
                                        {(
                                            providers.map(provider => (
                                                <option key={provider.id_proveedor} onClick={() => handleSelectProvider(provider)}>
                                                    {provider.nombre}
                                                </option>
                                            ))
                                    )}
                                        </select>
                                        {/*<button type="button" className="modal-edit-product-management-select-icon" onClick={toggleProvider}>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </button>*/}
                                    </div>
                                
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
