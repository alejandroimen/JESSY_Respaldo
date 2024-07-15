import React from "react";
import CardProduct from "../molecules/CardProduct";
import "../styles/organisms/ContainerCards.css"
import productoImagen from "../../assets/sendlier.png"

const products = [
    {
        id: 1,
        image: productoImagen,
        name: "Producto 1",
        price: 999.99,
        enlace: "" 
    },
    {
        id: 2,
        image: productoImagen,
        name: "Producto 2",
        price: 999.99,
        enlace: "" 
    },
    {
        id: 3,
        image: productoImagen,
        name: "Producto 3",
        price: 999.99,
        enlace: "" 
    },
    {
        id: 4,
        image: productoImagen,
        name: "Producto 4",
        price: 999.99,
        enlace: "" 
    },
    {
        id: 5,
        image: productoImagen,
        name: "Producto 5",
        price: 999.99,
        enlace: "" 
    },
    {
        id: 6,
        image: productoImagen,
        name: "Producto 6",
        price: 999.99,
        enlace: "" 
    },
    {
        id: 7,
        image: productoImagen,
        name: "Producto 7",
        price: 999.99,
        enlace: "" 
    }
];

function ContainerCards (props) {
    return(
        <div className="container-cards-and-button">
            <h1 className="titulo"> {props.encabezado} </h1>
            <ul className="container-cards"> 
                {products.map((product) => (
                    <CardProduct 
                        id = {product.id}
                        name = {product.name}
                        image = {product.image}
                        price = {product.price}
                        enlace = {product.enlace}
                    />
                ))}
            </ul>
            <button className="button-advance">{">"}</button>
        </div>
    )
}

export default ContainerCards;