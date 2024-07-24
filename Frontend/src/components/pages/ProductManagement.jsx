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
            console.log('SI TOY');
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
        //const productosData = { 'title': title, 'price': price, 'available_quantity': available_quantity, 'file': pictures[0], 'description': description, 'category_id': category_id };
        console.log('Selected file:', image); 
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('available_quantity', available_quantity);
        formData.append('description', description);
        formData.append('category_id', category_id);
        formData.append('file', image);

        console.log('este es el producto', formData);
        
    
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
        setImage({file: image});
        console.log('ImagenURL', image);
    };
    
    /*const handleAddProducto = async () => {
        const productosData = { title, price, available_quantity, pictures, description, category_id, provider_id };
        try {
            await axios.post('http://localhost:3000/products/', productosData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchProductos();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };*/
    
/*
    const handleImageUpload = (image) => {
        setPictures([{ source: image }]);
    }; */

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
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
                    {productos.map(producto => (
               <div className="product-item" key={producto.id}>
              <button className="edit-btn">
                <div className="red-square"></div>
              </button>
           <div className="product-details">
               <p>{producto.title}</p>
               <p>${producto.price}</p>
                <p>{producto.available_quantity}</p>
                <p>{producto.provider_name}</p>
            </div>
              <div className="product-actions">
               <button className="add-pencil-btn">
                   <i className="fa-solid fa-pencil"></i>
               </button>
                 <button className="delete-btn">
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
                title = {title}
                price = {price}
                available_quantity = {available_quantity}
                categories={categories}
                providers={providers}
                setTitle = {setTitle}
                setPrice = {setPrice}
                setAvailable_quantity = {setAvailable_quantity}
                setCategory_id={setCategory_id}
                setProvider_id={setProvider_id}
                handleAddProducto={handleAddProducto}
                setDescription = {setDescription}
                handleImageUpload={handleImageUpload}
            />
        </div>
    );
};

export default ProductManagement;
