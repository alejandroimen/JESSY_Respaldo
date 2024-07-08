import React from 'react';
import SidebarMenu from '../molecules/SidebarMenu';
import '../styles/SidebarMenu.css';

const SidebarMenu = ({ isOpen, toggleMenu }) => {
    return (
        <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="profile-section">
                    <div className="logo-container">
                        <Logo />
                    </div>
                    <button className="close-btn" onClick={toggleMenu}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <nav className="menu">
                    <ul>
                        <li><a href="/products">Gestión de productos</a></li>
                        <li><a href="#">Gestionar categorías</a></li>
                        <li><a href="#">Administrar proveedores</a></li>
                        <li><a href="#">Historial de ventas</a></li>
                        <li><a href="#">Ver como cliente</a></li>
                    </ul>
                </nav>
                <div className="logout-container">
                    <button className="logout-btn">Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;