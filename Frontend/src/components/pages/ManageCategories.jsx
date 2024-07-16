//Esta es la vista completa de categoria
import React, { useState } from 'react';
import Logo from '../atoms/Logo';
import ModalCategories from '../molecules/ModalCategories';
import ModalEditManageCategories from '../molecules/ModalEditManageCategories';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import ModalDeleteManageCategories from '../molecules/ModalDeleteManageCategories';
import '../styles/pages/ManageCategories.css'

const ManageCategories = ({ toggleCategoriesMenu }) => {
    const [isModalCategoriesOpen, setIsModalCategoriesOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleModalCategoriesToggle = () => {
        setIsModalCategoriesOpen(!isModalCategoriesOpen);
    };

    const handleEditModalToggle = () => {
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleDeleteModalToggle = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleDelete = () => {
        // Lógica para eliminar la categoría
        console.log('Categoría eliminada');
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="category-management">
            <header className="navbar">
                <div className="navbar-left">
                    <button className="menu-btn" onClick={toggleCategoriesMenu}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="header-logo">
                        <Logo className="logo-categories" />
                    </div>
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
                        <h1>Gestionar categorías</h1>
                    </div>
                    <div className="right-actions">
                        <i className="fa-solid fa-plus new-category-btn" onClick={handleModalCategoriesToggle}></i>
                    </div>
                </div>
                <div className="category-list-container">
                    <div className="category-list">
                        <div className="category-item">
                            <button className="edit-btn">
                                <div className="red-square"></div>
                            </button>
                            <div className="category-details-name">
                                <p>Nombre</p>
                            </div>
                            <div className="category-details-products">
                                <p>Ver productos</p>
                            </div>
                            <div className="category-actions">
                                <button className="add-pencil-btn" onClick={handleEditModalToggle}>
                                    <i className="fa-solid fa-pencil"></i>
                                </button>
                            </div>
                        </div>
                        {/* Más categorías */}
                    </div>
                </div>
            </div>
            <ModalCategories isOpen={isModalCategoriesOpen} onClose={handleModalCategoriesToggle}>
                <div className="modal-body">
                    <div className="category-form-container">
                        <div className="left-side">
                            <div className="form-fields">
                                <label className="label-name">Nombre</label>
                                <Input type="text" className="input name-input" />
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <Button className="submit-btn-add">Agregar</Button>
                    </div>
                </div>
            </ModalCategories>
            <ModalEditManageCategories isOpen={isEditModalOpen} onClose={handleEditModalToggle} />
            <ModalDeleteManageCategories isOpen={isDeleteModalOpen} onRequestClose={handleDeleteModalToggle} onDelete={handleDelete} />
        </div>
    );
};

export default ManageCategories;
