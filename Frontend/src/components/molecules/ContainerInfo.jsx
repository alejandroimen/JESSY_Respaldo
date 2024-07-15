import React from "react";
import imagen from "../../assets/sendlier.png"
import "../styles/molecules/ContainerInfo.css"
import { FaRegBookmark } from "react-icons/fa6";

function ContainerInfo(){
    return(
        <div className="container-info-and-buttons">
            <div className="container-buttons">
                <button className="btn-icon">
                    <FaRegBookmark />
                </button>
                <button className="btn-text">
                        Ir a comprar
                </button>
            </div>
            <div  className="container-elements">
                <img src={imagen} alt="" />
                <div className="text-container">
                    <h2 className="titulo"> Nombre </h2>
                    <p className="precio-anterior"> $999.99 </p>
                    <p className="precio-actual"> $999.99 </p>
                    <p className="categoria"> Categoria </p>
                    <p className="descripcion"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quae adipisci corrupti tenetur repellat. Doloremque commodi dolore animi, molestias corporis ipsum omnis qui tenetur deleniti nobis, aliquam rem asperiores tempore.
                    Dolor, ab quidem iste molestiae culpa molestias animi fuga aperiam maxime voluptatem amet adipisci reiciendis quas possimus exercitationem nostrum magnam ipsum quis inventore? Maiores ratione, id totam tempore suscipit temporibus. </p>
                </div>
            </div>
        </div>
    )
}

export default ContainerInfo;