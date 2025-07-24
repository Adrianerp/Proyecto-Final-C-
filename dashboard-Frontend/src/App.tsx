import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import ListarCategorias from "./components/ListarComponents/listarCategorias";
import ListarJuegos from "./components/ListarComponents/listarJuegos";
import ListarUsuarios from "./components/ListarComponents/listarUsuarios";
import ListarReservas from "./components/ListarComponents/listarReservas";
import ListarClientes from "./components/ListarComponents/listarClientes";
import EditarCategoria from "./components/editarComponents/EditarCategoria";
import EditarJuego from "./components/editarComponents/EditarJuego";
import EditarUsuario from "./components/editarComponents/EditarUsuario";
import EditarCliente from "./components/editarComponents/EditarCliente";
import { CrearCategoria } from './components/CrearComponents/CrearCategoria';
import { CrearJuego } from "./components/CrearComponents/CrearJuego";
import CrearUsuario from "./components/CrearComponents/CrearUsuario";
import Reserva from "./components/Reserva/Reserva";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute";
import LogoutView from "./components/Login/LogoutView";
import ListarDetalleVidejuego from "./components/ListarComponents/listarDetalleVidejuego";



function App() {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/",
            element: <PrivateRoute />, // 👈 Protege todas las rutas internas
            children: [
                {
                    path: "/",
                    element: <Layout />,
                    children: [
                        { path: "/home", element: <DashboardPage /> },
                        { path: "/reservar", element: <Reserva /> },
                        { path: "listar-categorias", element: <ListarCategorias /> },
                        { path: "editar-categoria/:id", element: <EditarCategoria /> },
                        { path: "listar-juegos", element: <ListarJuegos /> },
                        { path: "editar-juego/:id", element: <EditarJuego /> },
                        { path: "listar-usuarios", element: <ListarUsuarios /> },
                        { path: "editar-usuario/:id", element: <EditarUsuario /> },
                        { path: "listar-reservas", element: <ListarReservas /> },
                        { path: "listar-clientes", element: <ListarClientes /> },
                        { path: "listar-detalleReserva", element: <ListarDetalleVidejuego /> },
                        { path: "editar-cliente/:id", element: <EditarCliente /> },
                        { path: "/crear-categoria", element: <CrearCategoria /> },
                        { path: "/crear-juego", element: <CrearJuego /> },
                        { path: "/crear-usuario", element: <CrearUsuario /> },
                        { path: "/sesion-logout", element: <LogoutView />},
                    ],
                }
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
