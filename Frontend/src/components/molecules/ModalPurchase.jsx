import React from 'react';
import PropTypes from 'prop-types';
import '../styles/molecules/ModalPurchase.css';

const ModalPurchase = ({ isOpen, onClose, onAdd, newPurchase, setNewPurchase, products, providers }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPurchase((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-purchase-overlay">
      <div className="modal-purchase-container">
      <div className="modal-purchase-header">
        <h2>Agregar Compra</h2>
        <button className="modal-purchase-close-btn" onClick={onClose}>
            <i className="fas fa-times purchase-close-btn"></i>
          </button>
          </div>
          <div className="modal-purchase-body">
        <form className="modal-purchase-form-container">
        <div className="modal-purchase-form-fields">
        <div className="modal-purchase-form-fields-row">
        <div className="modal-purchase-input-container">
          <label>
            Producto:
            <select name="product" value={newPurchase.product} className="modal-purchase-input" onChange={handleChange} >
              <option value="">Seleccionar producto</option>
              {products.map((product) => (
                <option key={product.id_ML} value={product.id_ML}>{product.title}</option>
              ))}
            </select>
          </label>
          <i className="fa-solid fa-caret-down select-icon"></i>
                </div>
              </div>
          <div className="modal-purchase-form-fields-row">
                <div className="modal-purchase-input-container">
          <label>
            Proveedor:
            <select name="provider" value={newPurchase.provider} className="modal-purchase-input" onChange={handleChange}>
              <option value="">Seleccionar proveedor</option>
              {providers.map((provider) => (
                <option key={provider.id_proveedor} value={provider.id_proveedor}>{provider.nombre}</option>
              ))}
            </select>
          </label>
          <i className="fa-solid fa-caret-down select-icon"></i>
                </div>
              </div>
              <div className="modal-purchase-form-fields-row">
                <div className="modal-purchase-input-container">
          <label className="modal-purchase-label">
            Cantidad:
            <input
              type="number"
              name="quantity"
              className="modal-purchase-input"
              value={newPurchase.quantity}
              onChange={handleChange}
            />
          </label>
          </div>
              </div>
            </div>
        </form>
        </div>
        <div className="modal-purchase-footer">
          <button className="modal-purchase-submit-btn-add" onClick={onAdd}>Agregar</button>
        </div>
      </div>
    </div>
  
    
  );
};

ModalPurchase.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  newPurchase: PropTypes.object.isRequired,
  setNewPurchase: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  providers: PropTypes.array.isRequired,
};

export default ModalPurchase;
