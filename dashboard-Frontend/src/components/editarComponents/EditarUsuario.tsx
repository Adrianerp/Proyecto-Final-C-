import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Usuario } from '@/Models/usuarios';
import Swal from 'sweetalert2';
import { editUsuario, getOneByID } from '@/services/usuarioService';

export default function EditarUsuario() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Usuario>({
    usuarioId: 0,
    nombre: '',
    usuario: '',
    clave: '',
    rol: '',
  });

  useEffect(() => {
    if (id) {
      getOneByID(Number(id)).then(data => setFormData(data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editUsuario(Number(id), formData);
      await Swal.fire('Actualizado', 'El usuario fue actualizado correctamente.', 'success');
      navigate('/listar-usuarios');
    } catch (error) {
      console.error('Error al editar usuario:', error);
      Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Usuario</label>
          <input
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Clave</label>
          <input
            name="clave"
            type="password"
            value={formData.clave}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rol</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione un rol</option>
            <option value="admin">Admin</option>
            <option value="usuario">Usuario</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
