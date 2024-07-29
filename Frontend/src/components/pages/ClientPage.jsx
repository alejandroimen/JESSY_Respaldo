import React, { useState, useEffect } from 'react';
import Navbar from "../organisms/Navbar";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from "../atoms/Logo";
import ContainerCards from "../organisms/ContainerCards";
import Slider from "../organisms/Slider";
import ModalFiltroProductos from "../organisms/ModalFiltroProductos";
import Footer from "../molecules/Footer";
import "../styles/pages/ClientPage.css"

function ClientPage({ toggleMenu }) {
    const [categorias, setCategorias] = useState([]);
    const [productosPorCategoria, setProductosPorCategoria] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categorias', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
                setError('Error al obtener las categorías');
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchProductosPorCategoria = async () => {
            const nuevosProductosPorCategoria = {};
            for (const categoria of categorias) {
                try {
                    const response = await axios.get(`http://localhost:3000/categorias/${categoria.id_Categorias}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    nuevosProductosPorCategoria[categoria.nombreCategoria] = response.data.productos;
                } catch (error) {
                    console.error(`Error al obtener los productos para la categoría ${categoria.nombreCategoria}:`, error);
                }
            }
            setProductosPorCategoria(nuevosProductosPorCategoria);
            setLoading(false);
        };

        if (categorias.length > 0) {
            fetchProductosPorCategoria();
        }
    }, [categorias]);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="page-body">
            <header className="navbar">
                <div className="navbar-left">
                    <div className="header-logo">
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
            <Slider />
            {Object.keys(productosPorCategoria).map((nombreCategoria) => (
                <ContainerCards 
                    key={nombreCategoria}
                    encabezado={nombreCategoria}
                    productos={productosPorCategoria[nombreCategoria]} 
                />
            ))}
            <Footer />
        </div>
    );
}

export default ClientPage;
