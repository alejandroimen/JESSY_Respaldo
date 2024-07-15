import React from "react";
import "../styles/molecules/CardProduct.css"

function CardProduct (props){
    return (
        <li className="card-product" id = {props.id}>
            <img src={props.image} alt="" />
            <h2> {props.name} </h2>
            <p> $ {" " + props.price} </p>
            <a href={props.enlace}>Ir a Mercado Libre</a>
        </li>
    )
}

export default CardProduct;