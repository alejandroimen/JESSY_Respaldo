import React, { useEffect, useState } from "react";
import "../styles/organisms/NavbarCategorias.css"

const categories = [
    {
        id: 1,
        name: "Jugueteria" 
    },
    {
        id: 2,
        name: "Electrónica" 
    },
    {
        id: 3,
        name: "Videojuegos" 
    },
    {
        id: 4,
        name: "Electrodomésticos" 
    }
]

function NavbarCategorias(){
    const [selected, setSelected] = useState(1)
    const categorias = categories.map((categoria) => {
        if (categoria.id == selected){
            return (
                <li className="categoria-seleccionada" id={categoria.id}
                onClick={(e) => {
                    setSelected(e.target.id)
                }} >
                    {categoria.name}
                </li>
            )
        }
        return(
            <li className="opcion-categoria" id={categoria.id}
            onClick={(e) => {
                setSelected(e.target.id)
            }} >
                {categoria.name}
            </li> 
        ) 
    })


    

    return(
        <ul className="lista-categorias">
            {categorias}
        </ul>
    )
}

export default NavbarCategorias;