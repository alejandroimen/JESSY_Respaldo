import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContainerInfo from "../molecules/ContainerInfo";
import Footer from "../molecules/Footer";
import "../styles/pages/InformationProduct.css";

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
                setError('Error al obtener el producto');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Cargando detalles del producto...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Producto no encontrado</p>;

    return (
        <div className="page-body">
            <ContainerInfo product={product} />
            <Footer />
        </div>
    );
}

export default ProductDetailPage;
