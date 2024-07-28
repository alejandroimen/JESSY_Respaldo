import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from './components/molecules/SidebarMenu';
import Navbar from './components/organisms/Navbar';
import './components/styles/organisms/styles.css';

const App = () => {
    return (
        <div className="app">
            <Navbar />
            <SidebarMenu />
            <div className="app-container">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
