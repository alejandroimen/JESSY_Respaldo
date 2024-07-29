import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../molecules/InputField';
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';
import FormContainer from '../templates/FormContainer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/organisms/styles.css';



const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate= useNavigate();

    const handleLogin = async (e) => {
        console.log(email, password)
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/usersJWT/login', {
                email,
                password
            });
            console.log("Entre")
            console.log(response.data);
            alert("Inicio de sesión exitoso");
            // Guarda el token en localStorage o en el contexto de la aplicación
            localStorage.setItem('token', response.data.token);
            const token = localStorage.getItem('token');
            const response2 = await axios.get('http://localhost:3000/usersJWT/role', {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              const userRole = response2.data.idRol;
            if (userRole == 2) {
                navigate('/');
            } else {
                navigate('/client');
            }
            
            
        } catch (error) {
            console.error(error);
            alert("Error al iniciar sesión");
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
            <FormContainer icon="user" titulo="Bievenido">
                <form onSubmit={handleLogin} className="form">
                    <label className="input-label" htmlFor="email">Correo electrónico</label>
                    <InputField
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                    />
                    <label className="input-label" htmlFor="password">Contraseña</label>
                    <div className="input-field">
                        <input 
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="password-toggle"
                        >
                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </span>
                    </div>
                    <Button type="submit" label="Iniciar Sesión" className="btn btn-primary" />
                    <p className="auth-link" style={{ color: 'black' }}>
                        ¿No tienes una cuenta? <Link to="/register" className="link">Regístrate aquí</Link>
                    </p>
                </form>
            </FormContainer>
        </div>
    );
};

export default LoginForm;