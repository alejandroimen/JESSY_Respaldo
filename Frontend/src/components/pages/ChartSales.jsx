import React from 'react';
import { Link } from 'react-router-dom';
import { FaDownload } from "react-icons/fa6";
import Logo from '../atoms/Logo';
import SidebarMenu from '../molecules/SidebarMenu';
import CustomLineChart from '../organisms/LineChart';
import CustomPieChart from '../organisms/PieChart';
import CustomBarChart from '../organisms/BarChart';
import Footer from '../atoms/Footer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/pages/ChartSales.css';

const ChartSales = () => {

    const handleDownload = async () => {
        const input = document.getElementById('charts-section');
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // Ancho del PDF en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const position = 10; // Espacio desde la parte superior del PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save("Charts-Sales.pdf");
    };

    return (
        <div className="chart-page">
            <header className="navbar">
                <div className="navbar-left">
                    <>
                        <SidebarMenu />
                        <button className="menu-btn">
                            <i className="fas fa-bars"></i>
                        </button>
                    </>
                    <div className="header-line">
                        <Logo className="logo-sales-history" />
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="profile-circle">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>
            </header>
            <div className="arrow-button-container">
                <Link to="/SalesHistory">
                    <i className="fa-solid fa-arrow-rotate-left"></i>
                </Link>
            </div>
            <div className="content">
                <section id="charts-section" className="charts-section">
                    <div className="chart-container">
                        <div className="chart-row">
                            <CustomLineChart className="chart-line" />
                            <CustomPieChart className="chart-pie" />
                        </div>
                        <div className="chart-row">
                            <CustomBarChart className="chart-bar" />
                        </div>
                    </div>
                </section>
            </div>
            <div className="download-icon" onClick={handleDownload}>
                <FaDownload className="download-icon" />
            </div>
            <Footer className="footer-chart" />
        </div>
    );
};

export default ChartSales;
