import React from "react";
import CardProduct from "../molecules/CardProduct";
import "../styles/organisms/ContainerCards.css";

function ContainerCards({ encabezado, productos }) {
    return (
        <div className="container-cards-and-button">
            <h1 className="titulo"> {encabezado} </h1>
            <ul className="container-cards">
                {productos.map((product) => (
                    <CardProduct 
                        key={product.id}
                        id={product.id}
                        name={product.title}
                        image={product.thumbnail}
                        price={product.price}
                        enlace={product.permalink}
                    />
                ))}
            </ul>
            <button className="button-advance">{">"}</button>
        </div>
    );
}

export default ContainerCards;
