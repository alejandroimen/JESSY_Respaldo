import React, { useState } from 'react';
import '../styles/molecules/ModalProductManagement.css';

const ModalProductManagement = ({ isOpen, onClose, categories, providers, setCategory_id, setProvider_id }) => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [providerOpen, setProviderOpen] = useState(false);

    const toggleCategory = () => {
        setCategoryOpen(!categoryOpen);
    };
 
    const toggleProvider = () => {
        setProviderOpen(!providerOpen);
    };

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
                                    <label className="modal-product-management-label-name">Nombre del producto</label>
                                    <input type="text" className="modal-product-management-input modal-product-management-nombre-input" />
                                </div>
                            <div className="modal-product-management-form-fields-row">
                                <div className="modal-product-management-input-container">
                                    <label className="modal-product-management-label-name">Cantidad disponible</label>
                                    <input type="number" className="modal-product-management-input modal-product-management-cantidad-input" />
                                </div>
                                <div className="modal-product-management-input-container">
                                    <label className="modal-product-management-label-name">Precio</label>
                                    <input type="number" className="modal-product-management-input modal-product-management-precio-input" />
                                </div>
                             </div>
                            
                                <div className="modal-product-management-input-container">
                                    <label className="modal-product-management-label-name">Categoría</label>
                                    <div className="modal-product-management-select-container" /*onClick={toggleCategory}*/>
                                        <select type="text" className="modal-product-management-input modal-product-management-categoria-input" >
                                            <option value="">Seleccionar</option>
                                            {(
                                                categories.map(category => (
                                                    <option key={category.id_Categorias} onClick={() => handleSelectCategory(category)}>
                                                        {category.nombreCategoria}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                        
                                        {/*<button type='button' className="modal-product-management-select-icon" onClick={toggleCategory}>                                        <i className={`fas ${categoryOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                        </button>*/}
                                    </div>
                                    
                                </div>

                                <div className="modal-product-management-input-container">
                                    <label className="modal-product-management-label-name">Proveedor</label>
                                    <div className="modal-product-management-select-container" onClick={toggleProvider}>
                                    <select type="text" className="modal-product-management-input modal-product-management-proveedor-input" >
                                        {(
                                            providers.map(provider => (
                                                <option key={provider.id_proveedor} onClick={() => handleSelectProvider(provider)}>
                                                    {provider.nombre}
                                                </option>
                                            ))
                                        )}
                                        </select>
                                    </div>
                                    
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
