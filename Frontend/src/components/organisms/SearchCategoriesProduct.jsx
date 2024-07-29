import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '../atoms/Logo';
import SidebarMenu from '../molecules/SidebarMenu';
import '../styles/organisms/searchCategoriesProduct.css';

function SearchCategoriesProduct() {
    const [isOpen, setIsOpen] = useState(false);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id_Categorias } = useParams();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchProductos = async () => {
            console.log('Fetch de productos iniciado');
            console.log('ID de categoría:', id_Categorias);
            try {
                const response = await axios.get(`http://localhost:3000/categorias/${id_Categorias}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('Respuesta del servidor:', response.data.productos);
                setProductos(response.data.productos || []);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setError('Error al obtener los productos');
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, [id_Categorias]);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="category-management-search">
            <header className="navbar-search">
                <div className="navbar-left-search">
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
                <div className="navbar-right-search">
                    <div className="profile-circle-search">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>
            </header>
            <div className="content-categories-search">
                <div className="actions-categories-search">
                    <h1>Productos de la categoría</h1>
                </div>
                <div className="product-list-container-search">
                    {productos.length === 0 ? (
                        <p>Aún no hay productos con esta categoría</p>
                    ) : (
                        <div className="product-list-search">
                            {productos.map((producto) => (
                                <div key={producto.id} className="product-item-search">
                                    <img src={producto.thumbnail} alt={producto.title} className="product-image-search" />
                                    <div className="product-details-search">
                                        <p className="product-title-search">{producto.title}</p>
                                        <p className="product-price-search">${producto.price}</p>
                                        <p className="product-stock-search">Stock: {producto.available_quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchCategoriesProduct;
