import React, { useState } from 'react';
import axios from 'axios';
import '../styles/molecules/ModalEditProductManagement.css';
import ImageUpload from '../atoms/ImageUpload';

const ModalEditProductManagement = ({ isOpen, onClose, categories, providers, setCategory_id, setProvider_id, handleEditToggle, handleImageUpload, category_id, provider_id, title, setTitle, description, setDescription, price, setPrice, available_quantity, setAvailable_quantity, currentProduct, fetchProductos, onEditProduct }) => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [providerOpen, setProviderOpen] = useState(false);

    const toggleCategory = () => setCategoryOpen(!categoryOpen);
    const toggleProvider = () => setProviderOpen(!providerOpen);

    const handleSubmit = (e) => {
        e.preventDefault();
        onEditProduct();
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
        <div className="modal-edit-product-management-overlay">
            <div className="modal-edit-product-management-container">
                <div className="modal-edit-product-management-header">
                    <h2>Editar</h2>
                    <button className="modal-edit-product-management-close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-edit-product-management-body">
                    <form className="modal-edit-product-management-form-container" encType="multipart/form-data" method='post' action='/upload' onSubmit={handleSubmit}>
                        <div className="modal-edit-product-management-upper">
                            <div className="modal-edit-product-management-image-upload">
                                <div className="modal-edit-product-management-image-placeholder">
                                    <ImageUpload onUpload={handleImageUpload} />
                                </div>
                            </div>
                            <div className="modal-edit-product-management-form-fields">
                                <div className="modal-edit-product-management-input-container">
                                    <label className="modal-edit-product-management-label">Nombre</label>
                                    <input type="text" className="modal-edit-product-management-input modal-edit-product-management-nombre-input" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="modal-edit-product-management-form-fields-row">
                                    <div className="modal-edit-product-management-input-container">
                                        <label className="modal-edit-product-management-label">Cantidad</label>
                                        <input type="number" className="modal-edit-product-management-input modal-edit-product-management-cantidad-input" value={available_quantity} onChange={(e) => setAvailable_quantity(e.target.value)} />
                                    </div>
                                    <div className="modal-edit-product-management-input-container">
                                        <label className="modal-edit-product-management-label">Precio</label>
                                        <input type="number" className="modal-edit-product-management-input modal-edit-product-management-precio-input" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                </div>
                                <div className="modal-edit-product-management-input-container">
                                    <label className="modal-edit-product-management-label">Categoría</label>
                                    <div className="modal-edit-product-management-select-container">
                                        <select className="modal-product-management-input modal-product-management-categoria-input" value={category_id} onChange={(e) => setCategory_id(e.target.value)}>
                                            {categories.map(category => (
                                                <option key={category.id_Categorias} value={category.id_Categorias}  onClick={() => handleSelectCategory(category)}>
                                                {category.nombreCategoria}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-edit-product-management-input-container">
                                    <label className="modal-edit-product-management-label">Proveedor</label>
                                    <div className="modal-edit-product-management-select-container">
                                        <select className="modal-product-management-input modal-product-management-proveedor-input" value={provider_id} onChange={(e) => setProvider_id(e.target.value)}>
                                            {providers.map(provider => (
                                                <option key={provider.id_proveedor} value={provider.id_proveedor} onClick={() => handleSelectProvider(provider)}>
                                                {provider.nombre}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <textarea className="modal-edit-product-management-description-input" placeholder="Escribe una pequeña descripción..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <button className="modal-edit-product-management-submit-btn" type="submit">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEditProductManagement;
