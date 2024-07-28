import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pages/ManageSuppliers.css';
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';
import ModalSuppliers from '../molecules/ModalSuppliers';
import SidebarMenu from '../molecules/SidebarMenu';
import DeleteModal from '../molecules/DeleteModal';

const ManageSuppliers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalEditSuppliersOpen, setIsModalEditSuppliersOpen] = useState(false);
    const [isModalAddSuppliersOpen, setIsModalAddSuppliersOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [currentSupplier, setCurrentSupplier] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
 
    const handleAddOrEditSupplier = async (event) => {
        event.preventDefault(); 
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
            handleModalClose();
        } catch (error) {
            console.error('Error al editar o agregar el producto', error);
        }
    };

    const handleDeleteSupplier = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/proveedores/${currentSupplier.id_proveedor}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Proveedor eliminado correctamente');
            fetchSuppliers();
            setIsDeleteModalOpen(false);
            setCurrentSupplier(null);
        } catch (error) {
            console.error('Error al eliminar el proveedor', error);
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
        setNombre('');
        setEmail('');
        setTelefono('');
    };

    const handleModalClose = () => {
        setIsModalEditSuppliersOpen(false);
        setIsModalAddSuppliersOpen(false);
        setCurrentSupplier(null);
        setNombre('');
        setEmail('');
        setTelefono('');
    };

    return (
        <div className="suppliers-management">
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
            <div className="content-suppliers">
                <div className="actions-suppliers">
                    <div className="left-actions-suppliers">
                        <h1>Administrar proveedores</h1>
                    </div>
                    <div className="right-actions-suppliers">
                        <i className="fa-solid fa-plus new-product-btn" onClick={handleModalAddSuppliersToggle}></i>
                    </div>
                </div>
                <div className="product-list-container">
                    <div className="product-list">
                        {suppliers.map((supplier) => (
                            <div className="product-item" key={supplier.id_proveedor}>
                                <button className="edit-btn" onClick={() => {
                                    setCurrentSupplier(supplier);
                                    setNombre(supplier.nombre);
                                    setEmail(supplier.email);
                                    setTelefono(supplier.telefono);
                                    setIsModalEditSuppliersOpen(true);
                                }}>
                                    <div className="red-square"></div>
                                </button>
                                <div className="product-details-suppliers">
                                    <p>{supplier.nombre}</p>
                                    <p>{supplier.email}</p>
                                    <p>{supplier.telefono}</p>
                                </div>
                                <div className="product-actions">
                                    <button className="add-pencil-btn" onClick={() => {
                                        setCurrentSupplier(supplier);
                                        console.log(supplier);
                                        setNombre(supplier.nombre);
                                        setEmail(supplier.email);
                                        setTelefono(supplier.telefono);
                                        setIsModalEditSuppliersOpen(true);
                                    }}>
                                        <i className="fa-solid fa-pencil"></i>
                                    </button>
                                    <button className="delete-btn" onClick={() => {
                                        setCurrentSupplier(supplier);
                                        setIsDeleteModalOpen(true);
                                    }}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ModalSuppliers
                isOpen={isModalEditSuppliersOpen}
                onClose={handleModalEditSuppliersToggle}
                titulo="Editar Proveedor"
                nombre={nombre}
                setNombre={setNombre}
                email={email}
                setEmail={setEmail}
                telefono={telefono}
                setTelefono={setTelefono}
                handleSubmit={handleAddOrEditSupplier}
            />
            <ModalSuppliers
                isOpen={isModalAddSuppliersOpen}
                onClose={handleModalAddSuppliersToggle}
                titulo="Agregar Proveedor"
                nombre={nombre}
                setNombre={setNombre}
                email={email}
                setEmail={setEmail}
                telefono={telefono}
                setTelefono={setTelefono}
                handleSubmit={handleAddOrEditSupplier}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteSupplier}
            />
        </div>
    );
};

export default ManageSuppliers;
