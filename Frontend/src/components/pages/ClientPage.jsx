import React from "react";
import Navbar from "../organisms/Navbar";
import Logo from "../atoms/Logo";
import ContainerCards from "../organisms/ContainerCards";
import NavbarCategorias from "../organisms/NavbarCategorias";
import Slider from "../organisms/Slider";
import ModalFiltroProductos from "../organisms/ModalFiltroProductos";
import Footer from "../molecules/Footer";
import "../styles/pages/ClientPage.css"

function ClientPage({toggleMenu}){
    return(
        <div className="page-body">
            <header className="navbar">
                <div className="navbar-left">
                    <div className="header-logo">
                        <Logo className="custom-logo" />
                    </div>
                </div>
                <ModalFiltroProductos />     
                <div className="navbar-right">
                    <div className="profile-circle"> 
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>
            </header>
            <Slider />
            <NavbarCategorias />
            <ContainerCards encabezado = "Mas vendidos"/>
            <ContainerCards encabezado = "Mas vendidos"/>
            <Footer />
        </div>
    )
}

 export default ClientPage;