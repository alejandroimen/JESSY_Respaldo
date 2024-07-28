import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Logo from '../atoms/Logo';
import axios from 'axios';
import SidebarMenu from '../molecules/SidebarMenu';
import '../styles/pages/SalesHistory.css'; 

function SalesHistory({ toggleCategoriesMenu }) {
    const [isOpen, setIsOpen] = useState(false);
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log('Esta entrando');
            const fecha = '2024-07-31T00:00:00.000-00:00';
            
            const response = await axios.post(`http://localhost:3000/ventas/ML/`,{
                to: fecha
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }) 
     
            console.log('Response data:', response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      const getDate = ({ fecha = null, hora = true }) => {
        console.log('Entro a cañlcular la fecha');
        let date;
        if (!fecha) {
          if (!hora) {
            date = moment().format("YYYY-MM-DD");
          } else {
            date = moment().format("YYYY-MM-DD HH:mm:ss");
          }
        } else {
          if (!hora) {
            date = moment(fecha).format("YYYY-MM-DD");
          } else {
            date = moment(fecha).format("YYYY-MM-DD HH:mm:ss");
          }
        }
        console.log('Esta es', date);
        return date;
      };    

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://localhost:3000/ventas', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSales(response.data);
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);



    const handleEditModalToggle = () => {//NO SE VA A EDITAR
        // Implementa la lógica para el modal de edición
    };

    const handleDeleteModalToggle = () => {//NO SE VA A ELIMINAR
        // Implementa la lógica para el modal de eliminación
    };

    return (
        <div className="sales-history"> 
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
                        <Logo className="logo-sales-history" />
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="profile-circle">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>
            </header>
            <div className="arrow-button-container">
                <Link to="/sales-history">
                    <i className="fa-solid fa-arrow-rotate-left"></i>
                </Link>
            </div>
            <div className="content">
                <div className="actions">
                    <div className="left-actions">
                        <h1>Historial de Ventas</h1>
                    </div>
                    <div className="right-actions">
                        <Link to="/reportsales" className="report-link">Generar Reporte</Link>
                        <Link to="/chartsales" className="chart-link">Ver gráfico</Link>
                    </div>
                </div>
                <div className="sales-list-container">
                    <div className="sales-list">
                        {sales.map((sale) => (
                            <div key={sale.id} className="sales-history-item">
                                <button className="sales-history-edit-btn">
                                    <div className="sales-history-red-square"></div>
                                </button>
                                <div className="sales-history-details">
                                    <p>{sale.nombreCliente}</p>
                                    <p>{sale.nombreProducto}</p>
                                    <p>{`$ ${sale.precio}`}</p>
                                    <p>{sale.cantidad}</p>
                                    <p>{sale.fecha}</p>
                                </div>
                                <div className="sales-history-product-actions">
                                    <button className="sales-history-add-pencil-btn" onClick={handleEditModalToggle}>
                                        <i className="fa-solid fa-pencil"></i>
                                    </button>
                                    <button className="sales-history-delete-btn" onClick={handleDeleteModalToggle}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesHistory;
