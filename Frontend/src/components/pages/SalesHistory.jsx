import React, { useState, useEffect } from 'react';
import { IoBag } from "react-icons/io5";
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
    let fechita = getDate();
    console.log('Fechita: ', fechita);
    const fetchData = async () => {
      try {
        console.log('Esta entrando');
        const fecha = getDate();

        const response = await axios.post(`http://localhost:3000/ventas/ML/`, {
          to: fecha
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        console.log('Response data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchSales();
  }, []);
  console.log('Estas son las ventas', sales);

  const getDate = () => {
    const formattedDate = moment().format('YYYY-MM-DDT00:00:00.000-00:00');

    console.log(formattedDate)
    return formattedDate;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:3000/ventas/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Esta es la response', response);
      setSales(response.data);
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
    }
  };

  const salesRendered = sales.map((sale) => {
    const fecha = sale.fechaVenta.split('T')[0];
    return (
      <div key={sale.id} className="sales-history-item">
        <div className="sales-history-details">
          <IoBag />
          <p className='sale-id'>{sale.idVenta}</p>
          <Link className='see-products' to={`/productsSelled/${sale.idVenta}`}> Ver productos </Link>
          <p className='sale-total'>{`$ ${sale?.total}`}</p>
          <p className='sale-fecha'>{fecha.split('-')[2] + '-' + fecha.split('-')[1] + '-' + fecha.split('-')[0]}</p>
        </div>
      </div>
    )
  })

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
            {salesRendered}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesHistory;
