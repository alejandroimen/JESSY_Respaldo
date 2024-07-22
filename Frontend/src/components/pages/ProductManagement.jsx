import React, { useState, useEffect } from 'react';
import Logo from '../atoms/Logo';
import ModalProductManagement from '../molecules/ModalProductManagement';
import ModalEditProductManagement from '../molecules/ModalEditProductManagement';
import ModalDeleteProductManagement from '../molecules/ModalDeleteProductManagement';
import ModalFiltroProductos from '../organisms/ModalFiltroProductos';
import SidebarMenu from '../molecules/SidebarMenu';
import axios from 'axios';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import ImageUpload from '../atoms/ImageUpload';
import '../styles/pages/ProductManagement.css';

const ProductManagement = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productos, setProductos] = useState([]);
    const [editProductos, setEditProductos] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [pictures, setPictures] = useState('');
    const [available_quantity, setAvailable_quantity] = useState('');
    const [provider_id, setProvider_id] = useState(''); // Agregado
    const [categories, setCategories] = useState([]);
    const [providers, setProviders] = useState([]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        fetchProductos();
        fetchCategories();
        fetchProviders();
    }, []);

    const fetchProductos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/products/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProductos(response.data);
        } catch (error) {
            console.error('Error ', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProviders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/proveedores', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProviders(response.data);
        } catch (error) {
            console.error('Error fetching providers:', error);
        }
    };

    const handleAddProducto = async () => {
        const productosData = { title, price, available_quantity, pictures, description, category_id, provider_id }; // Agregado provider_id
        try {
            await axios.post('http://localhost:3000/products/', productosData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchProductos();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    };

    const handleEditProducto = async () => {
        const productosData = { title, price, available_quantity, pictures, description, category_id, provider_id }; // Agregado provider_id
        try {
            await axios.put(`http://localhost:3000/products/${editProductos.id_producto}`, productosData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchProductos();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
        setEditProductos(null);
    };

    const handleEditModalToggle = () => {
        setIsEditModalOpen(!isEditModalOpen);
        setEditProductos(null);
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
                <ModalFiltroProductos categories = {categories} />
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
                        {/* Más productos */}
                    </div>
                </div>
            </div>
            <ModalProductManagement
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                categories={categories}
                providers={providers}
                setCategory_id={setCategory_id}
                setProvider_id={setProvider_id} // Pasamos setProvider_id
            />
            <ModalEditProductManagement isOpen={isEditModalOpen} onClose={handleEditModalToggle} categories={categories}
                providers={providers}
                setCategory_id={setCategory_id}
                setProvider_id={setProvider_id}/>
            <ModalDeleteProductManagement isOpen={isDeleteModalOpen} onClose={handleDeleteModalToggle} onDelete={handleDelete} />
        </div>
    );
};

export default ProductManagement;
