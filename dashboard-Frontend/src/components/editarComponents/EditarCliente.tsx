import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cliente } from '@/Models/clientes';
import Swal from 'sweetalert2';
import { editCliente, getOneByID } from '@/services/clienteService';

export default function EditarCliente() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Cliente>({
    clienteId: 0,
    nombre: '',
    documento: '',
    telefono: '',
    email: '',
    fechaRegistro: ''
  });

  useEffect(() => {
    if (id) {
      getOneByID(Number(id)).then(data => setFormData(data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editCliente(Number(id), formData);
      await Swal.fire('Actualizado', 'El cliente fue actualizado correctamente.', 'success');
      navigate('/listar-clientes');
    } catch (error) {
      console.error('Error al editar cliente:', error);
      Swal.fire('Error', 'No se pudo actualizar el cliente.', 'error');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Editar Cliente</h2>
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
          <label className="block mb-1 font-medium">Documento</label>
          <input
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Teléfono</label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha de Registro</label>
          <input
            name="fechaRegistro"
            type="date"
            value={formData.fechaRegistro}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-green-700">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
