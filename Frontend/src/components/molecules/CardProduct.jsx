import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/molecules/CardProduct.css";

function CardProduct({ id, name, image, price, enlace }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/producto/${id}`);
    };


    return (
        <li className="card-product" onClick={handleClick}>
            <img src={image} alt={name} />
            <div >
                <h2 >{name}</h2>
                <p >${price}</p>
                <a href={enlace} target="_blank" rel="noopener noreferrer" >Ir a mercado libre</a>
            </div>
        </li>
    );
}

export default CardProduct;
