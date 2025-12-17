import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from 'react-router';
import Home from './pages/Home.jsx';
import Listado from './pages/Listado.jsx';
import Detalle from './pages/Detalle.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin.jsx';
import { SessionContext, SessionProvider } from './contexts/SessionContext.jsx';
import Register from './pages/Register.jsx';
import Delete from './pages/Delete.jsx';
import NuevoProducto from './pages/NuevoProducto.jsx';
import EditarProducto from './pages/EditarProducto.jsx';
import Proyectos from './pages/Proyectos.jsx';
import NuevoProyecto from './pages/NuevoProyecto.jsx';
import ProyectoDetalle from './pages/ProyectoDetalle.jsx';
import CategoriaProductos from './pages/CategoriaProducto.jsx';
import EditarPerfil from './pages/EditarPerfil.jsx';
import Perfil from './pages/Perfil.jsx';
import EditarProyecto from './pages/EditarProyecto.jsx';

// export async function loaderProductos() {
//   const res = await fetch("http://localhost:3333/api/productos")
//   const productos = await res.json()
//   return { productos }
// }


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categoria/:id",
        element: <ProtectedRoute element={<CategoriaProductos />} />,
      },
      {
        path: "/listado",
        element: <ProtectedRoute element={<Listado />} />,
        // loader: loaderProductos,
        // errorElement: <div>Error</div>
      },
      {
        path: "/detalle/:id",
        element: <ProtectedRoute element={<Detalle />} />,
        // loader: loaderPDetalle
      },
      {
        path: "/delete/:id",
        element: <ProtectedRoute element={<Delete />} />,
      },
      {
        path: "/nuevo-producto",
        element: <ProtectedRoute element={<NuevoProducto />} />,
      },
      {
        path: "/editar-producto/:id",
        element: <ProtectedRoute element={<EditarProducto />} />,
      },
      {
        path: "/proyectos",
        element: <ProtectedRoute element={<Proyectos />} />,
      },
      {
        path: "/nuevo-proyecto",
        element: <ProtectedRoute element={<NuevoProyecto />} />,
      },
      {
        path: "/detalleProyecto/:id",
        element: <ProtectedRoute element={<ProyectoDetalle />} />,
      },
      {
        path: "/proyecto-editar/:id",
        element: <ProtectedRoute element={<EditarProyecto />} />,
      },
      {
        path: "/perfil",
        element: <ProtectedRoute element={<Perfil />} />,
      },
      {
        path: "/perfil/editar",
        element: <ProtectedRoute element={<EditarPerfil />} />,
      },
      {
        path: "/login",
        element: <Login />
      }, {
        path: "/register",
        element: <Register />
      },
      {
        path: "/logout",
        element: <Logout />
      },

    ],
  },
  {
    path: '/admin',
    element: <ProtectedRouteAdmin element={<div>ADMIN</div>} />,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)
