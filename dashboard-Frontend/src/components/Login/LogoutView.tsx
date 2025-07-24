// src/pages/LogoutView.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Elimina la sesión
    localStorage.removeItem("usuario");

    // Redirige al login (puedes usar setTimeout si deseas retrasar ligeramente)
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-lg font-medium">
      Cerrando sesión...
    </div>
  );
};

export default LogoutView;
