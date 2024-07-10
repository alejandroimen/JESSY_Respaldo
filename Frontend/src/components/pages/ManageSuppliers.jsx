import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageSuppliers.css';
import Logo from '../atoms/Logo';
import ModalSuppliers from '../atoms/ModalSuppliers';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const ManageSuppliers = ({ toggleSuppliersMenu }) => {
    const [isModalEditSuppliersOpen, setIsModalEditSuppliersOpen] = useState(false);
    const [isModalAddSuppliersOpen, setIsModalAddSuppliersOpen] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [currentSupplier, setCurrentSupplier] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/proveedores/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers', error);
        }
    };

    const handleAddOrEditSupplier = async () => {
        const supplierData = { nombre, email, telefono };

        try {
            const token = localStorage.getItem('token');
            if (currentSupplier) {
                await axios.put(`http://localhost:3000/proveedores/${currentSupplier.id_proveedor}`, supplierData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('Proveedor actualizado correctamente');
            } else {
                await axios.post('http://localhost:3000/proveedores/', supplierData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('Proveedor agregado correctamente');
            }
            fetchSuppliers();
        } catch (error) {
            console.error('Error adding or editing supplier', error);
        }
    };

    const handleDeleteSupplier = async (id_proveedor) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/proveedores/${id_proveedor}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Proveedor eliminado correctamente');
            fetchSuppliers();
        } catch (error) {
            console.error('Error deleting supplier', error);
        }
    };

    const handleModalAddSuppliersToggle = () => {
        setIsModalAddSuppliersOpen(!isModalAddSuppliersOpen);
        setCurrentSupplier(null);
        setNombre('');
        setEmail('');
        setTelefono('');
    };
    const handleModalEditSuppliersToggle = () => {
        setIsModalEditSuppliersOpen(!isModalEditSuppliersOpen);
        setCurrentSupplier(null);
    };
    

    return (
        <div className="product-management">
            <header className="navbar">
                <div className="navbar-left">
                    <button className="menu-btn" onClick={toggleSuppliersMenu}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="header-line">
                        <Logo />
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="profile-circle">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>
            </header>
            <div className="content">
                <div className="actions">
                    <div className="left-actions">
                        <h1>Administrar proveedores</h1>
                    </div>
                    <div className="right-actions">
                        <i className="fa-solid fa-plus new-product-btn" onClick={handleModalAddSuppliersToggle}></i>
                    </div>
                </div>
                <div className="product-list-container">
                    <div className="product-list">
                        {suppliers.map((supplier) => (
                            <div className="product-item" key={supplier.id_proveedor}>
                                <button className="edit-btn" onClick={() => {
                                    setCurrentSupplier(supplier);
                                    setNombre(supplier.name);
                                    setEmail(supplier.email);
                                    setTelefono(supplier.telefono);
                                    setIsModalEditSuppliersOpen(true);
                                }}>
                                    <div className="red-square"></div>
                                </button>
                                <div className="product-details">
                                    <p>{supplier.nombre}</p>
                                    <p>{supplier.email}</p>
                                    <p>{supplier.telefono}</p>
                                </div>
                                <div className="product-actions">
                                    <button className="add-pencil-btn" onClick={() => {
                                        setCurrentSupplier(supplier);
                                        setNombre(supplier.name);
                                        setEmail(supplier.email);
                                        setTelefono(supplier.telefono);
                                        setIsModalEditSuppliersOpen(true);
                                    }}>
                                        <i className="fa-solid fa-pencil"></i>
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDeleteSupplier(supplier.id_proveedor)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ModalSuppliers isOpen={isModalEditSuppliersOpen} onClose={handleModalEditSuppliersToggle} titulo="Editar Proveedor">
                <div className="modal-body">
                    <div className="product-form-container">
                        <div className="left-side">
                            <div className="form-fields">
                                <label className="label-name">Nombre</label>
                                <Input type="text" className="input name-input" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="form-fields">
                                <label className="label-email">Email</label>
                                <Input type="text" className="input email-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-fields">
                                <label className="label-phone-number">Teléfono</label>
                                <Input type="text" className="input phone-number-input" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <Button className="submit-btn-add" onClick={handleAddOrEditSupplier} label={"Guardar"}></Button>
                    </div>
                </div>
            </ModalSuppliers>
            <ModalSuppliers isOpen={isModalAddSuppliersOpen} onClose={handleModalAddSuppliersToggle} titulo="Agregar Proveedor">
                <div className="modal-body">
                    <div className="product-form-container">
                        <div className="left-side">
                            <div className="form-fields">
                                <label className="label-name">Nombre</label>
                                <Input type="text" className="input name-input" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="form-fields">
                                <label className="label-email">Email</label>
                                <Input type="text" className="input email-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-fields">
                                <label className="label-phone-number">Teléfono</label>
                                <Input type="text" className="input phone-number-input" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <Button className="submit-btn-add" onClick={handleAddOrEditSupplier} label={"Agregar"}></Button>
                    </div>
                </div>
            </ModalSuppliers>
        </div>
    );
};

export default ManageSuppliers;
