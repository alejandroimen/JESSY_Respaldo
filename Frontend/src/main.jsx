import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import LoginForm from './components/organisms/LoginForm';
import RegisterForm from './components/organisms/RegisterForm';
import ReportSales from './components/pages/ReportSales';
import ChartSales from './components/pages/ChartSales';
import SalesHistory from './components/pages/SalesHistory';
import ProductManagement from './components/pages/ProductManagement';
import ManageSuppliers from './components/pages/ManageSuppliers';
import ClientPage from './components/pages/ClientPage';
import InformationProduct from './components/pages/InformationProduct';
import ManageCategories from './components/pages/ManageCategories';
import './components/styles/organisms/styles.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ProductManagement /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/products", element: <ProductManagement /> },
      { path: "/suppliers", element: <ManageSuppliers /> },
      { path: "/client", element: <ClientPage /> },
      { path: "/info", element: <InformationProduct /> },
      { path: "/categories", element: <ManageCategories /> },
      { path: "/saleshistory", element: <SalesHistory/> },
      { path: "/reportsales", element: <ReportSales/> },
      { path: "/chartsales", element: <ChartSales/> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
