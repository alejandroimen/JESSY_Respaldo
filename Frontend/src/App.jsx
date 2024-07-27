import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginForm from './components/organisms/LoginForm';
import RegisterForm from './components/organisms/RegisterForm';
import ProductManagement from './components/pages/ProductManagement';
import SidebarMenu from './components/molecules/SidebarMenu';
import Navbar from './components/organisms/Navbar';
import ManageSuppliers from './components/pages/ManageSuppliers';
import ClientPage from './components/pages/ClientPage';
import InformationProduct from './components/pages/InformationProduct';
import ManageCategories from './components/pages/ManageCategories';
import ManagaCompras from './components/pages/ManageCompras';
import './components/styles/organisms/styles.css'

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

const AppContent = () => {
    return (
        <div className="app-container">            
            <Routes>
                <Route path="/" element={<ProductManagement />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="/suppliers" element={<ManageSuppliers />} />
                <Route path="/client" element={<ClientPage />} />
                <Route path="/info" element={<InformationProduct />} />
                <Route path="/categories" element={<ManageCategories />} />
                <Route path="/compras" element={<ManagaCompras />} />
            </Routes>
        </div>
    );
}

export default App;
