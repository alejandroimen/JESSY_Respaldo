import React from 'react';
import '../styles/molecules/ModalEditManageCategories.css';

const ModalEditManageCategories = ({ isOpen, onClose, editCategory, setEditCategory, handleEditCategory }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
        setEditCategory({
            ...editCategory,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="modal-edit-manage-categorie-overlay">
            <div className="modal-edit-manage-categorie-container">
                <div className="modal-edit-manage-categorie-header">
                    <h2>Editar Categoría</h2>
                    <button className="modal-edit-manage-categorie-close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-edit-manage-categorie-body">
                    <form className="modal-edit-manage-categorie-form-container">
                        <div className="modal-edit-manage-categorie-form-fields">
                            
                            <div className="modal-edit-manage-categorie-form-fields-row">
                                <div className="modal-edit-manage-categorie-input-container">
                                    <label className="modal-edit-manage-categorie-label-name">Categoría</label>
                                    <input
                                        type="text"
                                        className="modal-edit-manage-categorie-input"
                                        name="nombreCategoria"
                                        value={editCategory.nombreCategoria}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-edit-manage-categorie-footer">
                    <button className="modal-edit-manage-categorie-submit-btn" onClick={handleEditCategory}>Editar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditManageCategories;
