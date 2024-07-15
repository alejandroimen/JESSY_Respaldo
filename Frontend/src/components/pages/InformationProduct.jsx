import React from "react";
import ContainerInfo from "../molecules/ContainerInfo";
import Footer from "../molecules/Footer";
import Comentarios from "../organisms/Comentarios";
import "../styles/pages/InformationProduct.css"
import imagen from "../../assets/sendlier.png"

const comments = [
    {
        user: "Pepe",
        image: imagen
    },
    {
        user: "Fulano",
        image: imagen
    }
]

function InformationProduct(){
    return(
        <div className="page-body">
            <ContainerInfo />
            <Comentarios comments = {comments} />
            <Footer />
        </div>
    )
}

export default InformationProduct;