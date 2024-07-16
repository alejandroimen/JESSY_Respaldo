import React, { useState } from 'react';
import Logo from '../atoms/Logo';
import ModalProductManagement from '../molecules/ModalProductManagement';
import ModalEditProductManagement from '../molecules/ModalEditProductManagement';
import ModalDeleteProductManagement from '../molecules/ModalDeleteProductManagement';
import ModalFiltroProductos from '../organisms/ModalFiltroProductos';
import SidebarMenu from '../molecules/SidebarMenu';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import ImageUpload from '../atoms/ImageUpload';
import '../styles/pages/ProductManagement.css';

const ProductManagement = () => { 
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                    <>
                        <SidebarMenu isOpen={isOpen} toggleMenu={toggleMenu} />
                        {!isOpen && (
                            <button className="menu-btn" onClick={toggleMenu}>
                                <i className="fas fa-bars"></i>
                            </button>
                        )}
                    </>
                    <div className="header-line">
                        <Logo className="custom-logo" />
                    </div>
                </div>
                <ModalFiltroProductos />     
                <div className="navbar-right">
                    <div className="profile-circle">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>
            </header>
            <div className="content-products-management">
                <div className="actions-products-management">
                    <div className="left-actions-products-management">
                        <h1>Gestión de productos</h1>
                    </div>
                    <div className="right-actions-products-management">
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
                        { /*Más productos*/ }
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
