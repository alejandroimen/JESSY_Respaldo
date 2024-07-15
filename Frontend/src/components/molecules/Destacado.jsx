import React from "react";
import "../styles/molecules/Destacado.css"

function Destacado(props){

    return(
        <div className="container-destacado">
            <div className="elements-top">
                <img src={props.img} alt="" />
                <div className="container-text">
                    <h2> {"+" + props.vendidos} </h2>
                    <p className="vendidos-msg"> Vendidos </p>
                    <p className="precio-anterior"> De: <span>$ {props.precio}</span> a </p>
                    <p className="precio"> {"$"+ props.precio} </p>
                </div>
            </div>
            <h1 className="titulo"> {props.name} </h1>
        </div>
    )
}

export default Destacado;