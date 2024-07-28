import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from './components/molecules/SidebarMenu';
import Navbar from './components/organisms/Navbar';
import ManageSuppliers from './components/pages/ManageSuppliers';
import ClientPage from './components/pages/ClientPage';
import InformationProduct from './components/pages/InformationProduct';
import ManageCategories from './components/pages/ManageCategories';
import './components/styles/organisms/styles.css'

const App = () => {
    return (
        <div className="app">
            <Navbar />
            <SidebarMenu />
            <div className="app-container">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
