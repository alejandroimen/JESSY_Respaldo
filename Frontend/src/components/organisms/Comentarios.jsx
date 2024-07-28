import React from "react";
import Comentario from "../molecules/Comentario";
import "../styles/organisms/Comentarios.css"

function Comentarios(props){
    const listaComentarios = props.comments.map((comment) => (
        <Comentario
            user = {comment.user}
            image = {comment.image}
        />
    ))

    return(
        <div className="container-comments">
            <p className="titulo-comentarios">Comentarios</p>
            <ul className="container-lista-comments">
                {listaComentarios}
            </ul>
        </div>
    )
}

export default Comentarios;