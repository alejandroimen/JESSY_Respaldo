import React from "react";
import "../styles/molecules/ContainerInfo.css";
import { FaRegBookmark } from "react-icons/fa6";

function ContainerInfo({ product }) {
    return (
        <div className="container-info-and-buttons">
            <div className="container-buttons">
                <button className="btn-icon">
                    <FaRegBookmark />
                </button>
                <button className="btn-text">
                    Ir a comprar
                </button>
            </div>
            <div className="container-elements">
                <img src={product.thumbnail} alt={product.title} />
                <div className="text-container">
                    <h2 className="titulo">{product.title}</h2>
                    <p className="precio-anterior">${product.original_price || product.price}</p>
                    <p className="precio-actual">${product.price}</p>
                    <p className="categoria">{product.category_id}</p>
                    <p className="descripcion">{product.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ContainerInfo;
