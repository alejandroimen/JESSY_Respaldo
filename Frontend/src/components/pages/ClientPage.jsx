import React from "react";
import Navbar from "../organisms/Navbar";
import ContainerCards from "../organisms/ContainerCards";
import NavbarCategorias from "../organisms/NavbarCategorias";
import Slider from "../organisms/Slider";
import Footer from "../molecules/Footer";
import "../styles/pages/ClientPage.css"

function ClientPage(){
    return(
        <div className="page-body">
            <Slider />
            <NavbarCategorias />
            <ContainerCards encabezado = "Mas vendidos"/>
            <ContainerCards encabezado = "Mas vendidos"/>
            <Footer />
        </div>
    )
}

 export default ClientPage;