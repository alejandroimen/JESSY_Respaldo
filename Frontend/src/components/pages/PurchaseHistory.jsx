import React, { useState } from 'react';
import SidebarMenu from '../molecules/SidebarMenu';
import Logo from '../atoms/Logo';
import PurchaseItem from '../organisms/PurchaseItem';
import ModalPurchase from '../molecules/ModalPurchase';
import '../styles/pages/PurchaseHistory.css';

const PurchaseHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPurchase, setNewPurchase] = useState({
    product: '',
    provider: '',
    quantity: ''
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleModalPurchaseToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddPurchase = () => {
    // Lógica para manejar la adición de una nueva compra
    console.log(newPurchase);
    handleModalPurchaseToggle();
  };

  const purchases = [
    { product: 'Producto', provider: 'Proveedor', price: '$ 999.99', quantity: '999', date: '10-10-2000' },
    { product: 'Producto', provider: 'Proveedor', price: '$ 999.99', quantity: '999', date: '10-10-2000' },
    { product: 'Producto', provider: 'Proveedor', price: '$ 999.99', quantity: '999', date: '10-10-2000' }
  ];

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
        newPurchase={newPurchase}
        setNewPurchase={setNewPurchase}
        handleAddPurchase={handleAddPurchase}
      />
    </div>
  );
};

export default PurchaseHistory;