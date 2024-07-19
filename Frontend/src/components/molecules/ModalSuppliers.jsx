import React from 'react';
import '../styles/molecules/ModalSuppliers.css';

function ModalSuppliers({ isOpen, onClose, titulo, nombre, setNombre, email, setEmail, telefono, setTelefono, handleSubmit }){
    if (!isOpen) return null;

    return (
        <div className="modal-suppliers-overlay">
            <div className="modal-suppliers-container">
                <div className="modal-suppliers-header">
                    <h2>{titulo}</h2>
                    <button className="modal-suppliers-close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-suppliers-body">
                    <form className="modal-suppliers-form-container" onSubmit={handleSubmit}>
                        <div className="modal-suppliers-form-fields">
                            <div className="modal-suppliers-form-fields-row">
                                <div className="modal-suppliers-input-container">
                                    <label className="modal-suppliers-label-name">Nombre</label>
                                    <input
                                        type="text"
                                        className="modal-suppliers-input modal-suppliers-name-input"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-suppliers-form-fields-row">
                                <div className="modal-suppliers-input-container">
                                    <label className="modal-suppliers-label-email">Email</label>
                                    <input
                                        type="email"
                                        className="modal-suppliers-input modal-suppliers-email-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-suppliers-form-fields-row">
                                <div className="modal-suppliers-input-container">
                                    <label className="modal-suppliers-label-phone-number">Número de Teléfono</label>
                                    <input
                                        type="text"
                                        className="modal-suppliers-input modal-suppliers-phone-number-input"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="modal-suppliers-submit-btn-add">
                            {titulo.includes('Agregar') ? 'Agregar' : 'Guardar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalSuppliers;
