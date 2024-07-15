import React from "react";
import Destacado from "../molecules/Destacado";
import imagen from "../../assets/sendlier.png"
import "../styles/organisms/Slider.css"

const vendidos = [
    {
        img: imagen,
        vendidos: 999,
        precio: 999.99,
        name: "Producto muy vendido"
    }
]   

function Slider(){
    const productosVendidos = vendidos.map((product) => (
        <Destacado 
            img = {product.img}
            vendidos = {product.vendidos}
            precio = {product.precio}
            name = {product.name}
        />
    ))

    return (
        <div className="container-slider">
            {productosVendidos}
        </div>
    )
} 

export default Slider;