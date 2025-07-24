import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const usuario = localStorage.getItem("usuario");
  return usuario ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;