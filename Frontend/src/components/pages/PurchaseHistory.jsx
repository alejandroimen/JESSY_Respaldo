import React, { useState, useEffect } from 'react';
import SidebarMenu from '../molecules/SidebarMenu';
import Logo from '../atoms/Logo';
import PurchaseItem from '../organisms/PurchaseItem';
import ModalPurchase from '../molecules/ModalPurchase';
import '../styles/pages/PurchaseHistory.css';
import axios from 'axios';

const PurchaseHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPurchase, setNewPurchase] = useState({
    product: '',
    provider: '',
    quantity: ''
  });
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchProductsAndProviders = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:3000/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProducts(productsResponse.data);

        const providersResponse = await axios.get('http://localhost:3000/proveedores', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProviders(providersResponse.data);
      } catch (error) {
        console.error('Error al obtener productos o proveedores:', error);
      }
    };

    const fetchPurchases = async () => {
      try {
        const purchasesResponse = await axios.get('http://localhost:3000/compras', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPurchases(purchasesResponse.data);
      } catch (error) {
        console.error('Error al obtener las compras:', error);
      }
    };

    fetchProductsAndProviders();
    fetchPurchases();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleModalPurchaseToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddPurchase = async () => {
    try {
      await axios.post('http://localhost:3000/compras/', newPurchase, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNewPurchase({ product: '', provider: '', quantity: '' });
      handleModalPurchaseToggle();
      // Refrescar la lista de compras
      const purchasesResponse = await axios.get('http://localhost:3000/compras/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPurchases(purchasesResponse.data);
    } catch (error) {
      console.error('Error al agregar la compra:', error);
    }
  };

  return (
    <div className="purchase-history">
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
            <Logo className="custom-logo" />
          </div>
        </div>
        <div className="navbar-right">
          <div className="profile-circle">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
      </header>
      <div className="header-actions">
        <h2>Historial de compras</h2>
        <div className="purchase-right-actions">
          <i className="fa-solid fa-plus purchase-new-product-btn" onClick={handleModalPurchaseToggle}></i>
        </div>
      </div>
      <div className="purchase-list">
        {purchases.map((purchase, index) => (
          <PurchaseItem key={index} {...purchase} />
        ))}
      </div>
      <ModalPurchase
        isOpen={isModalOpen}
        onClose={handleModalPurchaseToggle}
        onAdd={handleAddPurchase}
        newPurchase={newPurchase}
        setNewPurchase={setNewPurchase}
        products={products}
        providers={providers}
      />
    </div>
  );
};

export default PurchaseHistory;
