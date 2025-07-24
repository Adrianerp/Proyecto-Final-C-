import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUsuario } from "@/services/usuarioService";

const Login = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [clave, setClave] = useState("");

  const handleLogin = async () => {
    try {
      const usuario = await loginUsuario({ nombre, clave });
      localStorage.setItem("usuario", JSON.stringify(usuario));
      navigate("/home"); // 👈 Redirige luego del login
    } catch (error) {
      alert("Usuario o contraseña incorrectos");
      console.error("Error de login", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Login;
