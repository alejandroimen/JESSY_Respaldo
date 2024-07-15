import React from "react";
import "../styles/molecules/Footer.css"

function Footer(){
    return (
        <footer className="footer">
            <div>
                <h2>Contáctanos</h2>
                <ul>
                    <li>
                        correo@gmail.com
                    </li>
                    <li>
                        961 111 1100
                    </li> 
                </ul>
            </div>
            <div>
                <h2>Redes sociales</h2>
                <ul>
                    <li>
                        <a href="">@Instagram</a>
                    </li>
                    <li>
                        <a href="">@Instagram</a>
                    </li>
                    <li>
                        <a href="">@Instagram</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;