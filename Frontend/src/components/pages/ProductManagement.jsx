import React, { useState, useEffect } from 'react';
import Logo from '../atoms/Logo';
import ModalProductManagement from '../molecules/ModalProductManagement';
import ModalEditProductManagement from '../molecules/ModalEditProductManagement';
import ModalDeleteProductManagement from '../molecules/ModalDeleteProductManagement';
import ModalFiltroProductos from '../organisms/ModalFiltroProductos';
import ModalLogout from '../molecules/LogoutModal';
import SidebarMenu from '../molecules/SidebarMenu';
import axios from 'axios';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import ImageUpload from '../atoms/ImageUpload';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/ProductManagement.css';

const ProductManagement = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productos, setProductos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [image, setImage] = useState(null);
    const [available_quantity, setAvailable_quantity] = useState('');
    const [provider_id, setProvider_id] = useState('');
    const [categories, setCategories] = useState([]);
    const [providers, setProviders] = useState([]);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const navigate = useNavigate();

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
                    Authorization: `Bearer ${token}`,
                    'Content-Type': `application/json`
                }
            });
            setProductos(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
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
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('available_quantity', available_quantity);
        formData.append('description', description);
        formData.append('category_id', category_id);
        formData.append('file', image);

        try {
            await axios.post('http://localhost:3000/products/', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchProductos();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleImageUpload = (image) => {
        setImage({ file: image });
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDeleteToggle = async () => {
        if (!currentProduct || !currentProduct.id_ML) {
            console.error('ID de producto inválido');
            alert('ID de producto inválido');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            console.log(`Token de autorización: ${token}`); // Agrega este log
            console.log(`Eliminando producto con id_ML: ${currentProduct.id_ML}`);
            await axios.put(`http://localhost:3000/products/${currentProduct.id_ML}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Producto eliminado');
            fetchProductos();
            setDeleteProduct(false);
            setCurrentProduct(null);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto');
        }
    };

    const handleEditToggle = () => {
        setEditProduct(!editProduct);
        setCurrentProduct(null);
        setProviders('');
        setCategory_id('');
        setPrice('');
        setTitle('');
        setDescription('');
        setAvailable_quantity('');
        setImage('');
    };

    const handleLogoutModalToggle = () => {
        setIsLogoutModalOpen(!isLogoutModalOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Redirige a la página de inicio de sesión
    };

    const handleChangeAccountToggle = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Redirige a la página de inicio de sesión
    };

    return (
        <div className="product-management">
            <header className="navbar">
                <div className="navbar-left">
                    <SidebarMenu isOpen={isOpen} toggleMenu={toggleMenu} />
                    {!isOpen && (
                        <button className="menu-btn" onClick={toggleMenu}>
                            <i className="fas fa-bars"></i>
                        </button>
                    )}
                    <div className="header-line">
                        <Logo className="custom-logo" />
                    </div>
                </div>
                <ModalFiltroProductos categories={categories} />
                <div className="navbar-right">
                    <div className="profile-circle">
                        <i className="fas fa-user-circle"></i>
                        <div className="user-card">
                            <div className="user-icon">
                                <i className="fas fa-user-circle icon-log"></i>
                            </div>
                            <h3>Username</h3>
                            <a href="#" className="change-account" onClick={handleChangeAccountToggle}>Cambiar de cuenta</a>
                            <a href="#" className="logout" onClick={handleLogoutModalToggle}>Cerrar sesión</a>
                        </div>
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
                        {productos.map(producto => (
                            <div className="product-item" key={producto.id}>
                                <button className="edit-btn">
                                    <div className="red-square"></div>
                                </button>
                                <div className="product-details">
                                    <p>{producto.title}</p>
                                    <p>${producto.price}</p>
                                    <p>{producto.available_quantity}</p>
                                    <p>{producto.provider_name  }</p>
                                </div>
                                <div className="product-actions">
                                    <button className="add-pencil-btn" onClick={() => {
                                        setCurrentProduct(producto);
                                        setAvailable_quantity(producto.available_quantity);
                                        setCategory_id(producto.category_id);
                                        setPrice(producto.price);
                                        setDescription(producto.description);
                                        setTitle(producto.title);
                                        setImage(producto.image);
                                        setEditProduct(true);
                                    }}>
                                        <i className="fa-solid fa-pencil"></i>
                                    </button>
                                    <button className="delete-btn" onClick={() => {
                                        setCurrentProduct(producto);
                                        setDeleteProduct(true);
                                    }}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ModalProductManagement
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                title={title}
                price={price}
                available_quantity={available_quantity}
                categories={categories}
                providers={providers}
                setTitle={setTitle}
                setPrice={setPrice}
                setAvailable_quantity={setAvailable_quantity}
                setCategory_id={setCategory_id}
                setProvider_id={setProvider_id}
                handleAddProducto={handleAddProducto}
                setDescription={setDescription}
                handleImageUpload={handleImageUpload}
            />
            <ModalDeleteProductManagement
                isOpen={deleteProduct}
                onClose={() => setDeleteProduct(false)}
                onDelete={handleDeleteToggle}
            />
            <ModalEditProductManagement
                isOpen={editProduct}
                onClose={() => setEditProduct(false)}
                categories={categories}
                setAvailable_quantity={available_quantity}
                available_quantity={setAvailable_quantity}
                setCategory_id={category_id}
                category_id={setCategory_id}
                setPrice={price}
                price={setPrice}
                setDescription={description}
                description={setDescription}
                setTitle={title}
                title={setTitle}
                setImage={image}
                image={setImage}
                providers={providers}
                currentProduct={currentProduct}
                fetchProductos={fetchProductos}
                setCurrentProduct={setCurrentProduct}
                setProviders={setProviders}
                handleImageUpload={handleImageUpload}
                fetchCategories={fetchCategories}
                fetchProviders={fetchProviders}
            />
            <ModalLogout 
                isOpen={isLogoutModalOpen} 
                onClose={handleLogoutModalToggle} 
                onLogout={handleLogout} 
            />
        </div>
    );
};

export default ProductManagement;