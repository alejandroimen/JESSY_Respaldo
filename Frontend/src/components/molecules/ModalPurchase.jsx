import React from 'react';
import Button from '../atoms/Button';
import '../styles/molecules/ModalPurchase.css';

const ModalPurchase = ({ isOpen, onClose, newPurchase, setNewPurchase, handleAddPurchase }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setNewPurchase({
      ...newPurchase,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-purchase-overlay">
      <div className="modal-purchase-container">
        <div className="modal-purchase-header">
          <h2>Agregar compra</h2>
          <button className="modal-purchase-close-btn" onClick={onClose}>
            <i className="fas fa-times purchase-close-btn"></i>
          </button>
        </div>
        <div className="modal-purchase-body">
          <form className="modal-purchase-form-container">
            <div className="modal-purchase-form-fields">
              <div className="modal-purchase-form-fields-row">
                <div className="modal-purchase-input-container">
                  <select
                    className="modal-purchase-input"
                    name="product"
                    value={newPurchase.product}
                    onChange={handleChange}
                  >
                    <option value="">Producto</option>
                    <option value="Producto1">Producto 1</option>
                    <option value="Producto2">Producto 2</option>
                  </select>
                  <i className="fa-solid fa-caret-down select-icon"></i>
                </div>
              </div>
              <div className="modal-purchase-form-fields-row">
                <div className="modal-purchase-input-container">
                  <select
                    className="modal-purchase-input"
                    name="provider"
                    value={newPurchase.provider}
                    onChange={handleChange}
                  >
                    <option value="">Proveedor</option>
                    <option value="Proveedor1">Proveedor 1</option>
                    <option value="Proveedor2">Proveedor 2</option>
                  </select>
                  <i className="fa-solid fa-caret-down select-icon"></i>
                </div>
              </div>
              <div className="modal-purchase-form-fields-row">
                <div className="modal-purchase-input-container">
                  <label className="modal-purchase-label">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    className="modal-purchase-input"
                    name="quantity"
                    value={newPurchase.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-purchase-footer">
          <Button label="Agregar" className="modal-purchase-submit-btn-add" onClick={handleAddPurchase} />
        </div>
      </div>
    </div>
  );
};

export default ModalPurchase;