import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // IMPORTANTE
import { deleteCategoria, getCategorias } from '@/services/categoriaService';
import { Categoria } from '@/Models/categorias';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



DataTable.use(DT);

export default function ListarCategorias() {
  const [tableData, setTableData] = useState<Categoria[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categorias = await getCategorias();
        setTableData(categorias);
      } catch (error) {
        console.error('Error al listar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);


   useEffect(() => {
    const handler = (e: any) => {
      const target = e.target;
      if (target.classList.contains('btn-editar')) {
        const id = target.getAttribute('data-categoriaId');
        if (id) navigate(`/editar-categoria/${id}`);
      } else if (target.classList.contains('btn-eliminar')) {
        const id = target.getAttribute('data-categoriaId');
        if (id) handleEliminar(Number(id));
      }
    };

    const tableEl = tableRef.current?.querySelector('table');
    if (tableEl) {
      tableEl.addEventListener('click', handler);
    }

    return () => {
      if (tableEl) {
        tableEl.removeEventListener('click', handler);
      }
    };
  }, [tableData]);


const handleEliminar = async (id: number) => {
      try {
        await deleteCategoria(id);
        await Swal.fire({
          title: '¡Eliminado!',
          text: 'El Usuario ha sido eliminado permanentemente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        const autores = await getCategorias();
        setTableData(autores);
      } catch (error) {
        console.error("Error al eliminar físicamente el Usuario:", error);
        Swal.fire('Error', 'Hubo un problema al eliminar el usuario físicamente.', 'error');
      }
    };

  return (
    <div ref={tableRef}>
      <DataTable
        data={tableData.map(categoria => [
          categoria.categoriaId,
          categoria.nombreCategoria,
          categoria.descripcion,
          `<button class="btn-editar mx-1" data-categoriaId="${categoria.categoriaId}">Editar</button>
           <button class="btn-eliminar" data-categoriaId="${categoria.categoriaId}">Eliminar</button>`
        ])}
        columns={[
          { title: 'Id Categoria' },
          { title: 'Nombre Categoria' },
          { title: 'Descripcion' },
          { title: 'Acciones' }
        ]}
        className="display nowrap"
      />
    </div>
  );
}
