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
import SearchCategoriesProduct from './components/organisms/SearchCategoriesProduct';
import VentaProducts from './components/organisms/VentaProducts';
import ProtectedRoute from './components/organisms/ProtectedRoute';
import ProductDetailPage from './components/pages/ProductDetailPage';
import PurchaseHistory from './components/pages/PurchaseHistory';
import './components/styles/organisms/styles.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [                                  //Quienes pueden acceder?
      { 
        path: "/", 
        element: <ProtectedRoute allowedRoles={[2]}><ProductManagement /></ProtectedRoute> 
      },
      { path: "/register", element: <RegisterForm /> },
      { path: "/login", element: <LoginForm /> },
      { 
        path: "/products", 
        element: <ProtectedRoute allowedRoles={[2]}><ProductManagement /></ProtectedRoute> 
      },
      { 
        path: "/suppliers", 
        element: <ProtectedRoute allowedRoles={[2]}><ManageSuppliers /></ProtectedRoute> 
      },
      { path: "/client", element: <ClientPage /> },
      { path: "/info", element: <InformationProduct /> },
      {
        path: "/producto/:id", element: <ProductDetailPage />
      },
      { 
        path: "/categories", 
        element: <ProtectedRoute allowedRoles={[2]}><ManageCategories /></ProtectedRoute> 
      },
      { 
        path: "/saleshistory", 
        element: <ProtectedRoute allowedRoles={[2]}><SalesHistory /></ProtectedRoute> 
      },
      { 
        path: "/reportsales", 
        element: <ProtectedRoute allowedRoles={[2]}><ReportSales /></ProtectedRoute> 
      },
      { 
        path: "/chartsales", 
        element: <ProtectedRoute allowedRoles={[2]}><ChartSales /></ProtectedRoute> 
      },
      { 
        path: "/searchCategoriesProduct/:id_Categorias", 
        element: <ProtectedRoute allowedRoles={[2]}><SearchCategoriesProduct /></ProtectedRoute> 
      },
      {
        path: "/productsSelled/:id_Venta",
        element: <ProtectedRoute allowedRoles={[2]}><VentaProducts /></ProtectedRoute> 
      },
      { 
        path: "/purchasehistory", 
        element: <ProtectedRoute allowedRoles={[2]} > <PurchaseHistory /></ProtectedRoute>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
