import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDownload } from "react-icons/fa6";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Logo from '../atoms/Logo';
import axios from 'axios';
import CustomBarChart from '../organisms/BarChart';
import CustomLineChart from '../organisms/LineChart';
import CustomPieChart from '../organisms/PieChart';
import Table from '../molecules/Table';
import Footer from '../atoms/Footer';
import '../styles/pages/ReportSales.css';
import moment from 'moment';
import 'moment/locale/es';

const ReportSales = () => {
  let [ventas3, setVentas3] = useState([])
  let [ventas2, setVentas2] = useState([])
  let [ventas1, setVentas1] = useState([])
  let [mes1, setMes1] = useState({ invertido: 0, vendido: 0 })
  let [mes2, setMes2] = useState({ invertido: 0, vendido: 0 })
  let [mes3, setMes3] = useState({ invertido: 0, vendido: 0 })
  let [dataBar, setDataBar] = useState([])
  let [dataLine, setDataLine] = useState([])

  const getCurrentDate = () => {
    return moment();
  }
  const getDateMinus = (cant) => {
    return moment().subtract(cant, 'months')
  }



  const fetchDataVentas = async () => {
    console.log('Entro a la func');
    try {
      console.log('Esta entrando al try');

      const response = await axios.post(`http://localhost:3000/ventas/between/`, {
        old: getDateMinus(3).format('YYYY-M-DD'),
        med: getDateMinus(2).format('YYYY-M-DD'),
        last: getDateMinus(1).format('YYYY-M-DD')
      }, {})

      console.log('Response data:', response);
      console.log('Rsp', response.data.first);

      handleVenta(response.data.first, response.data.second, response.data.last);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataVentas()

  }, [])

  const handleVenta = (f, s, t) => {
    setVentas1(f);
    setVentas2(s);
    setVentas3(t);

    let invertidoMes1 = 0;
    let vendidoMes1 = 0;
    f.forEach((venta) => {
      vendidoMes1 += venta.total;
    });
    setMes1({ invertido: mes1.invertido, vendido: vendidoMes1 });

    let invertidoMes2 = 0;
    let vendidoMes2 = 0;
    s.forEach((venta) => {
      vendidoMes2 += venta.total;
    });
    setMes2({ invertido: mes2.invertido, vendido: vendidoMes2 });

    let invertidoMes3 = 0;
    let vendidoMes3 = 0;
    t.forEach((venta) => {
      vendidoMes3 += venta.total;
    });
    setMes3({ invertido: mes3.invertido, vendido: vendidoMes3 });
    setDataBar([
      { name: getDateMinus(3).format('MMM'), sales: f.length },
      { name: getDateMinus(2).format('MMM'), sales: s.length },
      { name: getDateMinus(1).format('MMM'), sales: t.length }
    ])
    setDataLine([
      { name: getDateMinus(4).format('MMM'), Ganancia: 0, Inversion: 20 },
      { name: getDateMinus(3).format('MMM'), Ganancia: vendidoMes1, Inversion: 20 },
      { name: getDateMinus(2).format('MMM'), Ganancia: vendidoMes2, Inversion: 20 },
      { name: getDateMinus(1).format('MMM'), Ganancia: vendidoMes3, Inversion: 20 },
      { name: getDateMinus(0).format('MMM'), Ganancia: vendidoMes3, Inversion: 20 }
    ])
  };

  const handleDownload = async () => {
    const input = document.getElementById("report-sales-content");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // Ancho del PDF en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const position = 10; // Espacio desde la parte superior del PDF
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    pdf.save("Report-Sales.pdf");
  };

  return (
    <div className="report-container" id="report-sales-content">
      <header className="header-report">
        <Logo className="LogoReport" />
        <nav>
          <Link to="/reportsales" className="report-link">REPORTE</Link>
        </nav>
      </header>
      <div className="download-icon" onClick={handleDownload}>
        <FaDownload className="download-icon" />
      </div>
      <div className="report-content">
        <h1>REPORTE</h1>
        <h2> {getDateMinus(3).format('MMMM')} — {getCurrentDate().format('MMMM')} </h2>
        <p className="paragrah1">Promedio de ganancia: {((mes1.vendido - mes1.invertido) + (mes2.vendido - mes2.invertido) + (mes3.vendido - mes3.invertido)) / 3}</p>
        <p className="paragrah2">Mes con más ganancia: {Math.max([(mes1.vendido - mes1.invertido), (mes2.vendido - mes2.invertido), (mes3.vendido - mes3.invertido)])} </p>
        <Table mes1={mes1} mes2={mes2} mes3={mes3} />
        <h2>GRÁFICAS</h2>
        <div className="charts-row">
          <div className="chart-wrapper">
            <CustomLineChart data={dataLine} />
          </div>
          <div className="chart-wrapper">
            <CustomPieChart />
          </div>
        </div>
        <div className="chart-wrapper full-width">
          <CustomBarChart data={dataBar} />
        </div>
      </div>
      <div className="FooterReport">
        <Footer />
      </div>
    </div>
  )
};

export default ReportSales;
