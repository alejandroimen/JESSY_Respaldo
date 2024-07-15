import React, { useState } from 'react';
import Logo from '../atoms/Logo';
import ModalProductManagement from '../molecules/ModalProductManagement';
import ModalEditProductManagement from '../molecules/ModalEditProductManagement';
import ModalDeleteProductManagement from '../molecules/ModalDeleteProductManagement';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import ImageUpload from '../atoms/ImageUpload';
import '../styles/pages/ProductManagement.css';

const ProductManagement = ({ toggleMenu }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const toggleFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const toggleCategoriesMenu = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
    };

    const handleMinPriceChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 1);
        setMinPrice(value);
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 1);
        setMaxPrice(value);
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleEditModalToggle = () => {
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleDeleteModalToggle = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleDelete = () => {
        // Lógica para eliminar el producto
        handleDeleteModalToggle();
    };

    return (
        <div className="product-management">
            <header className="navbar">
                <div className="navbar-left">
                    <button className="menu-btn" onClick={toggleMenu}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="header-logo">
                        <Logo className="custom-logo" />
                    </div>
                </div>
                <div className="navbar-center">
                    <button className="filter-btn" onClick={toggleFilterMenu}>
                        Filtrar <i className="fa-solid fa-chevron-down filter-icon"></i>
                    </button>
                    <div className={`filter-menu ${isFilterOpen ? 'open' : ''}`}>
                        <button className="category-btn" onClick={toggleCategoriesMenu}>
                            Categorías <i className="fa-solid fa-chevron-right categories-icon"></i>
                        </button>
                        {isCategoriesOpen && (
                            <ul className="categories-list">
                                <li>Categoría 1</li>
                                <li>Categoría 2</li>
                                <li>Categoría 3</li>
                            </ul>
                        )}
                        <button className="button-1">Ordenar (más caros primero)</button>
                        <button className="button-2">Ordenar (más baratos primero)</button>
                        <div className="price-range">
                            <label>Rango de precio:</label>
                            <div className="price-inputs">
                                <div className="input-container">
                                    <label>Min:</label>
                                    <input
                                        className="min-btn"
                                        type="number"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                                <div className="input-container">
                                    <label>Max:</label>
                                    <input
                                        className="max-btn"
                                        type="number"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>
                            <div className="range-slider">
                                <input
                                    type="range"
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                    min="0"
                                    max="100"
                                    className="thumb thumb-left"
                                />
                                <input
                                    type="range"
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    min="0"
                                    max="100"
                                    className="thumb thumb-right"
                                />
                                <div className="slider-track"></div>
                                <div className="slider-range" style={{ left: `${minPrice}%`, right: `${100 - maxPrice}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <input type="text" placeholder="Buscar" className="search-bar" />
                </div>
                <div className="navbar-right">
                    <div className="profile-circle">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>
            </header>
            <div className="content">
                <div className="actions">
                    <div className="left-actions">
                        <h1>Gestión de productos</h1>
                    </div>
                    <div className="right-actions">
                        <i className="fa-solid fa-plus new-product-btn" onClick={handleModalToggle}></i>
                    </div>
                </div>
                <div className="product-list-container">
                    <div className="product-list">
                        <div className="product-item">
                            <button className="edit-btn">
                                <div className="red-square"></div>
                            </button>
                            <div className="product-details">
                                <p>Nombre Producto</p>
                                <p>$ 999.99</p>
                                <p>9999</p>
                                <p>Proveedor</p>
                            </div>
                            <div className="product-actions">
                                <button className="add-pencil-btn" onClick={handleEditModalToggle}>
                                    <i className="fa-solid fa-pencil"></i>
                                </button>
                                <button className="delete-btn" onClick={handleDeleteModalToggle}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        {/* Más productos */}
                    </div>
                </div>
            </div>
            <ModalProductManagement isOpen={isModalOpen} onClose={handleModalToggle} />
            <ModalEditProductManagement isOpen={isEditModalOpen} onClose={handleEditModalToggle} />
            <ModalDeleteProductManagement isOpen={isDeleteModalOpen} onClose={handleDeleteModalToggle} onDelete={handleDelete} />
        </div>
    );
};

export default ProductManagement;
