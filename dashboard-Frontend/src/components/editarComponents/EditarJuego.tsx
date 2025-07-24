import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Juego } from '@/Models/juegos';
import Swal from 'sweetalert2';
import { editJuego, getOneByID } from '@/services/juegosService';
import { Categoria } from '@/Models/categorias';
import { getCategorias } from '@/services/categoriaService';

export default function EditarJuego() {
  const { id } = useParams<{ id: string }>();
  const [juego, setJuego] = useState<Juego | null>(null);
    const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const navigate = useNavigate();

    useEffect(() => {
    const fetchData = async () => {
      try {
        const [prod, cats] = await Promise.all([
          getOneByID(Number(id)),
          getCategorias(),

        ]);
        setJuego(prod);
        setCategorias(cats);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
      setJuego((prev: Juego | null) =>
      prev ? { ...prev, [name]: name === 'stock' || name === 'precio' || name === 'idCategoria' ? Number(value) : value } : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!juego) return;

    try {
      const { videojuegoId, ...juegoSinId } = juego;
      await editJuego(videojuegoId, juegoSinId);
      Swal.fire({
        title: "Éxito",
        text: "Cambios guardados correctamente",
        icon: "success"
      });
      navigate("/listar-juegos");
    } catch (error) {
      console.error("Error al actualizar el Producto:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al intentar Actualizar Producto",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Juego</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Título</label>
          <input name="titulo" value={juego?.titulo} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Género</label>
          <input name="genero" value={juego?.genero} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Plataforma</label>
          <input name="plataforma" value={juego?.plataforma} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input name="stock" type="number" value={juego?.stock} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Precio</label>
          <input name="precio" type="number" step="0.01" value={juego?.precio} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha de Lanzamiento</label>
          <input name="fechaLanzamiento" type="date" value={juego?.fechaLanzamiento} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Categoría</label>
          <select name="categoriaId" value={juego?.categoriaId} onChange={handleChange} className="w-full border px-3 py-2 rounded " >
            <option value="" className="text-black">-- Seleccione una categoría --</option>
            {categorias.map((cat) => (
              <option key={cat.categoriaId} value={cat.categoriaId} className="!text-black">
                {cat.nombreCategoria}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
