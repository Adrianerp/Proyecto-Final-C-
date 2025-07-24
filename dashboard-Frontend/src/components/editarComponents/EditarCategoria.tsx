import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Categoria } from '@/Models/categorias';
import { editCategoria, getOneByID, } from '@/services/categoriaService';

export default function EditarCategoria() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Categoria>({
        categoriaId: 0,
        nombreCategoria: '',
        descripcion: '',
    });

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                if (id) {
                    const data = await getOneByID(Number(id));
                    setFormData(data);
                }
            } catch (error) {
                console.error('Error al obtener la categoría:', error);
                Swal.fire('Error', 'No se pudo cargar la categoría', 'error');
                navigate('/listar-categorias');
            }
        };

        fetchCategoria();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await editCategoria(formData.categoriaId, formData
            );

            await Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'La categoría ha sido actualizada correctamente',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/listar-categorias');
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar la categoría', 'error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Categoría</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="nombreCategoria"
                        value={formData.nombreCategoria}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Descripción</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        rows={4}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
}
