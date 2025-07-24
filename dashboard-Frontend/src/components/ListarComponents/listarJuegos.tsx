import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // IMPORTANTE

import { useNavigate } from 'react-router-dom';
import { Juego } from '@/Models/juegos';
import { deleteJuegos, getJuegos } from '@/services/juegosService';
import Swal from 'sweetalert2';

DataTable.use(DT);

export default function listarJuegos() {
      const [tableData, setTableData] = useState<Juego[]>([]);
      const tableRef = useRef<HTMLDivElement>(null);
      const navigate = useNavigate();

      useEffect(() => {
          const fetchJuegos = async () => {
            try {
              const juegos = await getJuegos();
              setTableData(juegos);
            } catch (error) {
              console.error('Error al listar juegos:', error);
            }
          };
      
          fetchJuegos();
        }, []);
      
useEffect(() => {
    const handler = (e: any) => {
      const target = e.target;
      if (target.classList.contains('btn-editar')) {
        const id = target.getAttribute('data-videojuegoId');
        if (id) navigate(`/editar-juego/${id}`);
      } else if (target.classList.contains('btn-eliminar')) {
        const id = target.getAttribute('data-videojuegoId');
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
        await deleteJuegos(id);
        await Swal.fire({
          title: '¡Eliminado!',
          text: 'El Usuario ha sido eliminado permanentemente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        const autores = await getJuegos();
        setTableData(autores);
      } catch (error) {
        console.error("Error al eliminar físicamente el Usuario:", error);
        Swal.fire('Error', 'Hubo un problema al eliminar el usuario físicamente.', 'error');
      }
    };


  return (
    <div ref={tableRef}>
      <DataTable
        data={tableData.map(juego => [
          juego.videojuegoId,
          juego.titulo,
          juego.genero,
          juego.plataforma,
          juego.stock,
          juego.precio,
          juego.fechaLanzamiento,
          juego.nombreCategoria,
          `<button class="btn-editar mx-1" data-videojuegoId="${juego.videojuegoId}">Editar</button>
           <button class="btn-eliminar" data-videojuegoId="${juego.videojuegoId}">Eliminar</button>`
        ])}
        columns={[
          { title: 'Id Juego' },
          { title: 'Titulo' },
          { title: 'Genero' },
          { title: 'Plataforma' },
          { title: 'Stock' },
          { title: 'Precio' },
          { title: 'Fecha Lanzamiento' },
          { title: 'Categoria' },
          { title: 'Acciones' }
        ]}
        className="display nowrap"
      />
    </div>
  )
}
