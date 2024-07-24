import React, { useState } from "react";
import "../styles/molecules/ModalFiltroProductos.css"

function ModalFiltroProductos( {categories} ){
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    

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

    return (
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
                                {(
                                    categories.map(category => (
                                        <option key={category.id_Categorias} onClick={() => handleSelectCategory(category)}>
                                            {category.nombreCategoria}
                                        </option>
                                    ))
                                )}
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
    )
}

export default ModalFiltroProductos;