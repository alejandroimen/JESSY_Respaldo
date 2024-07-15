import React from "react";
import "../styles/molecules/Comentario.css"

function Comentario(props){
    return(
        <div className="comentario-container">
            <img src={props.image} alt="" />
            <div className="container-comment-content">
                <h4> {props.user} </h4>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, dicta numquam. Laborum aliquid minus, expedita aliquam natus doloribus adipisci cum pariatur, voluptas molestiae, beatae iure hic impedit repellat illo quam.
                Aperiam porro corrupti accusantium, officiis est voluptatum aut doloribus alias minima repellat minus facere! Iste, nostrum consectetur, optio totam doloremque commodi, recusandae excepturi magnam aut molestias dolorem delectus consequuntur consequatur?</p>
            </div>
        </div>
    )
}

export default Comentario;