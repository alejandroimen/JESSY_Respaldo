// Frontend: RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../molecules/InputField';
import Button from '../atoms/Button';
import FormContainer from '../templates/FormContainer';
import Logo from '../atoms/Logo';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/organisms/styles.css';

const RegisterForm = () => {
    const idRol = 1;
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Datos a enviar:", { usuario, email, password, confirmPassword });
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/usersJWT/', {
                usuario,
                email,
                password,
                idRol
            });
            console.log(response.data);
            alert("Usuario registrado correctamente");
        } catch (error) {
            console.error(error.response.data); // Mostrar el mensaje de error del servidor
            alert("Error al registrar el usuario: " + error.response.data);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="app-container">
            <header className="header-login">
                <div className="header-logo-login">
                    <Logo className="custom-logo" />
                </div>
            </header>  
            <div className="register-form-container">
                <FormContainer icon="user" titulo="Regístrate">  
                    <form onSubmit={handleRegister} className="form">
                        <label className="input-label" htmlFor="usuario">Usuario</label>
                        <InputField
                            id="usuario"
                            type="text"
                            value={usuario}
                            onChange={(e) => {
                                setUsuario(e.target.value)
                                console.log('hola', usuario)
                            }}
                            placeholder="Usuario"
                        />
                        <label className="input-label" htmlFor="email">Correo electrónico</label>
                        <InputField
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                console.log('hola', email)
                            }}
                            placeholder="Correo electrónico"
                        />
                        <label className="input-label" htmlFor="password">Contraseña</label>
                        <div className="input-field">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Escribe una contraseña"
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="password-toggle"
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>
                        <label className="input-label" htmlFor="confirmPassword">Confirmar contraseña</label>
                        <div className="input-field">
                            <input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Escribe la contraseña nuevamente"
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="password-toggle"
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>
                        <Button type='submit' label="Registrarme" className="btn btn-primary" />
                    </form>
                </FormContainer>
            </div>
        </div>
    );
};

export default RegisterForm;