import React from 'react';

import Button from '../atoms/Button';
import '../styles/molecules/ModalCategories.css';

const ModalCategories = ({ isOpen, onClose, newCategory, setNewCategory, handleAddCategory }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value
        }); 
    };

    return (
        <div className="modal-categories-overlay">
            <div className="modal-categories-container">
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
                                    <label className="modal-categories-label-id">Id</label>
                                    <input
                                        type="text"
                                        className="modal-categories-input modal-categories-id-input"
                                        name="id_Categorias"
                                        value={newCategory.id_Categorias}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-categories-form-fields-row">
                                <div className="modal-categories-input-container">
                                    <label className="modal-categories-label-name">Categoría</label>
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
                    <Button label="Agregar" className="modal-categories-submit-btn-add" onClick={handleAddCategory}></Button>
                </div>
            </div>
        </div>
    );
};

export default ModalCategories;
