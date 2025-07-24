import { useEffect, useState } from "react";
import listarCategorias from "../ListarComponents/listarCategorias";
import { crearJuego, getOneByID } from "@/services/juegosService";
import { Juego } from "@/Models/juegos";
import { getCategorias } from "@/services/categoriaService";
import { Categoria } from "@/Models/categorias";

export const CrearJuego = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    stock: 0,
    precio: 0,
    fechaLanzamiento: "",
    categoriaId: 0,
    nombreCategoria: ""
  });

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats] = await Promise.all([getCategorias()]);
        setCategorias(cats);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {}
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "precio" || name === "categoriaId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const juegoCreado = await crearJuego(formData);
      setMensaje(`Juego creado correctamente.`);
      setFormData({
        titulo: "",
        genero: "",
        plataforma: "",
        stock: 0,
        precio: 0,
        fechaLanzamiento: "",
        categoriaId: 0,
        nombreCategoria: "",
      });
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear el juego.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear Videojuego</h2>

      {mensaje && <p className="mb-4 text-blue-600 text-center text-sm">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            required
          />
        </div>

        <div>
          <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
            Género
          </label>
          <input
            type="text"
            id="genero"
            name="genero"
            placeholder="Género"
            value={formData.genero}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            required
          />
        </div>

        <div>
          <label htmlFor="plataforma" className="block text-sm font-medium text-gray-700">
            Plataforma
          </label>
          <input
            type="text"
            id="plataforma"
            name="plataforma"
            placeholder="Plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            required
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            min={0}
            required
          />
        </div>

        <div>
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="number"
            id="precio"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            min={0}
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="fechaLanzamiento" className="block text-sm font-medium text-gray-700">
            Fecha de Lanzamiento
          </label>
          <input
            type="date"
            id="fechaLanzamiento"
            name="fechaLanzamiento"
            value={formData.fechaLanzamiento}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            required
          />
        </div>

        <div>
          <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            id="categoriaId"
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            required
          >
            <option value={0} disabled>
              Selecciona una categoría
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.categoriaId} value={categoria.categoriaId}>
                {categoria.nombreCategoria}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Crear Videojuego
        </button>
      </form>
    </div>
  );
};
