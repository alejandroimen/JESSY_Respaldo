import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../atoms/Button';
import '../styles/molecules/ModalCategories.css';

const ModalCategories = ({ isOpen, onClose, newCategory, setNewCategory, handleAddCategory }) => {
    const [categoriesML, setCategoriesML] = useState([]);
    const [selectedCategoryML, setSelectedCategoryML] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchCategoriesML();
        }
    }, [isOpen]);

    const fetchCategoriesML = async () => {
        try {
            const response = await axios.get('http://localhost:3000/categoriasML', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCategoriesML(response.data);
        } catch (error) {
            console.error('Error al obtener las categorías de ML:', error);
        }
    };

    const handleChange = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeCategoryForML = (e) => {
        const selectedCategory = categoriesML.find(cat => cat.category_id === e.target.value);
        setSelectedCategoryML(e.target.value);
        setNewCategory({
            ...newCategory,
            id_Categorias: selectedCategory.category_id
        });
    };

    const handleAddCategoryAndRemoveFromML = async () => {
        try {
            await handleAddCategory();
            await axios.delete(`http://localhost:3000/categoriasML/${selectedCategoryML}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchCategoriesML();
            onClose();  // Cerrar la modal después de agregar la categoría
        } catch (error) {
            console.error('Error al eliminar la categoría de ML:', error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-categories-overlay" onClick={onClose}>
            <div className="modal-categories-container" onClick={(e) => e.stopPropagation()}>
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
                                    <label className="modal-categories-label-id">Cargar Categoría de ML</label>
                                    <select
                                        className="modal-product-management-input modal-product-management-categoria-input"
                                        value={selectedCategoryML}
                                        onChange={handleChangeCategoryForML}
                                    >
                                        <option value="">Seleccionar categoría</option>
                                        {categoriesML.map(category => (
                                            <option key={category.category_id} value={category.category_id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-categories-form-fields-row">
                                <div className="modal-categories-input-container">
                                    <label className="modal-categories-label-name">Nombre</label>
                                    <input
                                        type="text"
                                        className="modal-categories-input modal-categories-name-input"
                                        name="nombreCategoria"
                                        value={newCategory.nombreCategoria}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-categories-footer">
                    <Button label="Agregar" className="modal-categories-submit-btn-add" onClick={handleAddCategoryAndRemoveFromML}></Button>
                </div>
            </div>
        </div>
    );
};

export default ModalCategories;



{/*className="modal-categories-input modal-categories-id-input"*/}