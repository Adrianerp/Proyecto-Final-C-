import { useState } from "react";
import { crearCategoria } from "@/services/categoriaService"; // Ajusta el path según tu estructura
import { Categoria } from "@/Models/categorias";


export const CrearCategoria = () => {
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const nuevaCategoria: Omit<Categoria, "categoriaId"> = {
        nombreCategoria,
        descripcion,
      };

      const categoriaCreada = await crearCategoria(nuevaCategoria);
      setMensaje(`Categoría creada correctamente`);
      setNombreCategoria("");
      setDescripcion("");
    } catch (error) {
      setMensaje("Error al crear la categoría");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear Categoría</h2>

      {mensaje && <p className="mb-4 text-sm text-center text-blue-600">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de Categoría</label>
          <input
            type="text"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Crear Categoría
        </button>
      </form>
    </div>
  );
};

