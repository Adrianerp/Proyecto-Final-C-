import React, { useState } from "react";
import { crearUsuario } from "@/services/usuarioService";
import { Usuario } from "@/Models/usuarios";


const CrearUsuario: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Usuario, "usuarioId">>({
    nombre: "",
    usuario: "",
    clave: "",
    rol: "admin", // Puedes cambiar el valor por defecto si deseas
  });

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);
    setError(null);

    try {
      const usuarioCreado = await crearUsuario(formData);
      setMensaje(`Usuario creado correctamente`);
      setFormData({ nombre: "", usuario: "", clave: "", rol: "admin" });
    } catch (err) {
      setError("Error al crear el usuario");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-xl"
          required
        />
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={formData.usuario}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-xl"
          required
        />
        <input
          type="password"
          name="clave"
          placeholder="Contraseña"
          value={formData.clave}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-xl"
          required
        />
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-xl"
        >
          <option value="admin">Admin</option>
          <option value="usuario">Empleado</option>
        </select>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          {cargando ? "Creando..." : "Crear Usuario"}
        </button>

        {mensaje && <p className="text-green-600">{mensaje}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default CrearUsuario;
